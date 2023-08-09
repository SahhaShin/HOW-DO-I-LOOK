import { OpenVidu } from 'openvidu-browser';
// import FaceDetectionComponent from './FaceDetectionComponent';
import axios from 'axios';
import React, { Component } from 'react';
import './Streaming.css';
import UserVideoComponent from './UserVideoComponent';

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8081/';

class Streaming extends Component {
    constructor(props) {
        super(props);

        //session에서 유저 정보를 가져온다. 

        //가져온 user정보를 this.state에 입력 
        //
        // These properties are in the state's component in order to re-render the HTML whenever their values change
        this.state = {
            mySessionId: 'SessionA',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            session: undefined,
            mainStreamManager: undefined,  // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
            publisher: undefined,
            subscribers: [],
            cameraOn : true,
            audioOn : true
        };

        this.joinSession = this.joinSession.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.switchCamera = this.switchCamera.bind(this);
        this.toggleCamera = this.toggleCamera.bind(this);//카메라 토글호출함수 
        this.toggleAudio = this.toggleAudio.bind(this);//오디오 토글호출함수 
        this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
        this.onbeforeunload = this.onbeforeunload.bind(this);
    }

    componentDidMount() {
        //beforeunload는 마운트가 해제되기 전에 실행되는 이벤트
        //onbeforeunload메서드를 실행시키는데 이게 leavesession을 실행시킨다.
        window.addEventListener('beforeunload', this.onbeforeunload);
    }

    componentWillUnmount() {
        //브라우저 창을 닫거나 페이지를 떠나려고 할때 실행된다.
        //leavesession 버튼을 누르는것이랑 다르다.
        window.removeEventListener('beforeunload', this.onbeforeunload);
    }
    //위에서 실행된다.
    onbeforeunload(event) {
        this.leaveSession();
    }
    //sessionid바꾸기
    handleChangeSessionId(e) {
        this.setState({
            mySessionId: e.target.value,
        });
    }
    //이름바꾸기
    handleChangeUserName(e) {
        this.setState({
            myUserName: e.target.value,
        });
    }
    
    //메인스트림 바꿀 때 실행되는 메서드
    handleMainVideoStream(stream) {
        if (this.state.mainStreamManager !== stream) {
            this.setState({
                mainStreamManager: stream
            });
        }
    }
    //스트림 제거하는 메서드 이건 다른 메서드에서 실행된다.
    deleteSubscriber(streamManager) {
        let subscribers = this.state.subscribers;
        //제거할 스트림 위치 찾는다.
        let index = subscribers.indexOf(streamManager, 0);
        //-1보다 크다면 찾았다는 의미이다.
        if (index > -1) {
            //스트림 제거하는 부분
            subscribers.splice(index, 1);
            this.setState({
                subscribers: subscribers,
            });
        }
    }

    joinSession() {
        //Openvidu 객체 생성 하는 코드
        this.OV = new OpenVidu();

        //세션을 설정하는 부분
        this.setState(
            {
                //세션 초기화 하는 메서드
                session: this.OV.initSession(),
            },
            () => {
                var mySession = this.state.session;

                
                //세션에서 생성되는 이벤트가 발생되면 메서드가 실행된다.
                //새로운 스트림이 생성되었을 때 실행되는 메서드
                //subscribers에 새로운 스트림을 추가한다.
                //.on은 이벤트 리스너를 등록하는 것이다!!
                mySession.on('streamCreated', (event) => {
                    var subscriber = mySession.subscribe(event.stream, undefined);
                    var subscribers = [...this.state.subscribers]; 
                    subscribers.push(subscriber);

                    
                    this.setState({
                        subscribers: subscribers,
                    });
                });
                //세션에서 생성되는 이벤트가 발생되면 메서드가 실행된다.
                //스트림이 제거되면 발생하는 메서드
                mySession.on('streamDestroyed', (event) => {

                    this.deleteSubscriber(event.stream.streamManager);
                });

                //세션에서 생성되는 이벤트가 발생되면 메서드가 실행된다.
                mySession.on('exception', (exception) => {
                    console.warn(exception);
                });

                

                
                this.getToken().then((token) => {
                    mySession.connect(token, { clientData: this.state.myUserName })
                        //토큰을 잘 받아와서 세션에 연결하는 과정
                        .then(async () => {
                            //비디오 스트림을 생성하는 메서드
                            let publisher = await this.OV.initPublisherAsync(undefined, {
                                audioSource: undefined, // The source of audio. If undefined default microphone
                                videoSource: undefined, // The source of video. If undefined default webcam
                                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                                resolution: '1080x530', // The resolution of your video
                                frameRate: 30, // The frame rate of your video
                                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                                mirror: false, // Whether to mirror your local video or not
                            });


                            //내 세션에 스트림을 등록하는 메서드
                            mySession.publish(publisher);

                            //사용가능한 오디오 및 비디오 디바이스 목록 가져옵니다.
                            var devices = await this.OV.getDevices();
                            //비디오 입력 디바이스만 필터링
                            var videoDevices = devices.filter(device => device.kind === 'videoinput');
                            //스트림의 현재 비디오 디바이스의 id를 가져온다.
                            var currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
                            //스트림의 현재 비디오 디바이스를 가져온다.
                            var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

                            //비디오 디바이스,메인스트림 매니저, 퍼블리셔 등록
                            this.setState({
                                currentVideoDevice: currentVideoDevice,
                                mainStreamManager: this.state.subscribers.length > 0 ? this.state.subscribers[0] : publisher,
                                publisher: publisher,
                            });
                            // console.log(this.state.mainStreamManager);
                            // console.log(this.state.publisher);
                            // console.log(this.state.subscribers);
                        })
                        .catch((error) => {
                            console.log('There was an error connecting to the session:', error.code, error.message);
                        });
                });
            },
        );
    }

    leaveSession() { 
        //지금 세션 가져온다.
        const mySession = this.state.session;

        //연결 해제 메서드를 실행한다.
        if (mySession) {
            mySession.disconnect();
        }

        //openvidu 객체를 제거함.
        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mySessionId: 'SessionA',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            mainStreamManager: undefined,
            publisher: undefined
        });
    }

    async switchCamera() {
        try {
            const devices = await this.OV.getDevices()
            var videoDevices = devices.filter(device => device.kind === 'videoinput');

            if (videoDevices && videoDevices.length > 1) {

                var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

                if (newVideoDevice.length > 0) {
                    // Creating a new publisher with specific videoSource
                    // In mobile devices the default and first camera is the front one
                    var newPublisher = this.OV.initPublisher(undefined, {
                        videoSource: newVideoDevice[0].deviceId,
                        publishAudio: this.state.audioOn,
                        publishVideo: true,
                        mirror: true
                    });

                    //newPublisher.once("accessAllowed", () => {
                    await this.state.session.unpublish(this.state.mainStreamManager)

                    await this.state.session.publish(newPublisher)
                    this.setState({
                        currentVideoDevice: newVideoDevice[0],
                        mainStreamManager: newPublisher,
                        publisher: newPublisher,
                    });
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    //카메라 끄기/켜기
    async toggleCamera(e) {
        console.log("Camera ON/Off")
        
        const cameraOn = this.state.cameraOn;
        this.setState({
            cameraOn: !cameraOn
        });
    }
    //오디오(마이크) 끄기/켜기 
    async toggleAudio(e) {
        console.log("Audio ON/Off")
        const audioOn = this.state.audioOn;
        this.setState({
            audioOn: !audioOn
        });

    }

    render() {
        const mySessionId = this.state.mySessionId;
        const myUserName = this.state.myUserName;
        const cameraOn = this.state.cameraOn;
        const audioOn = this.state.audioOn;

        return (
            <div className="container">
                {/* 세션이 없다면!! */}
                {/* 맨처음 화면이 랜더링된다 그 아이디랑 세션 아이디 입력하는 부분 toDo: //  test때는 둔다. */}
                {this.state.session === undefined ? (
                    <div id="join">
                        <div id="img-div">
                            <img src="resources/images/openvidu_grey_bg_transp_cropped.png" alt="OpenVidu logo" />
                        </div>
                        <div id="join-dialog" className="jumbotron vertical-center">
                            <h1> Join a video session </h1>
                            <form className="form-group" onSubmit={this.joinSession}>
                                <p>
                                    <label>Participant: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="userName"
                                        value={myUserName}
                                        onChange={this.handleChangeUserName}
                                        required
                                    />
                                </p>
                                <p>
                                    <label> Session: </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="sessionId"
                                        value={mySessionId}
                                        onChange={this.handleChangeSessionId}
                                        required
                                    />
                                </p>
                                <p className="text-center">
                                    <input className="btn btn-lg btn-success" name="commit" type="submit" value="JOIN" />
                                </p>
                            </form>
                        </div>
                    </div>
                    // 만약 session이 있다면 null이므로 위에 html이 생략된다.
                ) : null}
                {/* 만약 세션이 있다면 아래의 html 코드가 실행된다. */}
                {this.state.session !== undefined ? (
                    <div id="session">
                        <div id="session-header" className='buttons'>
                            {/* <h1 id="session-title">{mySessionId}</h1> */}
                            <button className={(cameraOn)?"activeButton":"disableButton"} onClick={this.toggleCamera}><img src={process.env.PUBLIC_URL + `/img/live/camera.png`} alt='카메라'/> 카메라 {(cameraOn)?"끄기":"켜기"}</button>   
                            <button className={(audioOn)?"activeButton":"disableButton"} onClick={this.toggleAudio}><img src={process.env.PUBLIC_URL + `/img/live/audio.png`} alt='마이크'/>마이크 {(audioOn)?"끄기":"켜기"}</button>                          
                        </div>
                        {/* 메인스트림 매니저가 있을 때!! */}
                        {this.state.mainStreamManager !== undefined ? (
                            <div id="main-video" className="col-md-6">
                                <UserVideoComponent streamManager={this.state.mainStreamManager} />
                            </div>
                        ) : null}
                    </div>
                ) : null}
                
            </div>
        );
    }


    /**
     * --------------------------------------------
     * GETTING A TOKEN FROM YOUR APPLICATION SERVER
     * --------------------------------------------
     * The methods below request the creation of a Session and a Token to
     * your application server. This keeps your OpenVidu deployment secure.
     *
     * In this sample code, there is no user control at all. Anybody could
     * access your application server endpoints! In a real production
     * environment, your application server must identify the user to allow
     * access to the endpoints.
     *
     * Visit https://docs.openvidu.io/en/stable/application-server to learn
     * more about the integration of OpenVidu in your application server.
     */
    async getToken() {
        const sessionId = await this.createSession(this.state.mySessionId);
        return await this.createToken(sessionId);
    }

    async createSession(sessionId) {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data; // The sessionId
    }

    async createToken(sessionId) {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data; // The token
    }
}

export default Streaming;