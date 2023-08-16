import { OpenVidu } from "openvidu-browser";
// import FaceDetectionComponent from './FaceDetectionComponent';
import axios from "axios";
import React, { Component } from "react";
import "./Streaming.css";
import UserVideoComponent from "./UserVideoComponent";

import { CheckToken } from "../../../hook/UserApi";

const APPLICATION_SERVER_URL = process.env.REACT_APP_OPENVIDU;

class Streaming extends Component {
  constructor(props) {
    super(props);

    //session에서 유저 정보를 가져온다.
    const user = JSON.parse(sessionStorage.getItem("loginUser"));
    const hostId = window.sessionStorage.getItem("hostId");
    // const sessionid = "session2"; //window.sessionStorage.getItem("sessionid")
    console.log(user);
    console.log("userId : " + user.id);
    console.log("hostID : " + hostId);
    //가져온 user정보를 this.state에 입력
    //
    // These properties are in the state's component in order to re-render the HTML whenever their values change
    this.state = {
      mySessionId: hostId,
      myUserName: user.id,
      session: undefined,
      mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
      publisher: undefined,
      subscribers: [],
      cameraOn: true,
      audioOn: true,
      forUpdate: true,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.toggleCamera = this.toggleCamera.bind(this); //카메라 토글호출함수
    this.toggleAudio = this.toggleAudio.bind(this); //오디오 토글호출함수
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    // this.closeSession = this.closeSession.bind(this);
  }

  componentDidMount() {
    //beforeunload는 마운트가 해제되기 전에 실행되는 이벤트
    //onbeforeunload메서드를 실행시키는데 이게 leavesession을 실행시킨다.
    window.addEventListener("beforeunload", this.onbeforeunload);
    this.joinSession();
  }

  componentWillUnmount() {
    //브라우저 창을 닫거나 페이지를 떠나려고 할때 실행된다.
    //leavesession 버튼을 누르는것이랑 다르다.
    window.removeEventListener("beforeunload", this.onbeforeunload);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      areYouKick,
      liveEndAlert,
      exitAlam
    } = this.props;

    // 이전 값과 현재 값이 다르고, 원하는 조건이 충족되었을 때 leaveSession 호출
    if (
      (prevState.areYouKick !== areYouKick && areYouKick) ||
      (prevState.liveEndAlert !== liveEndAlert && liveEndAlert) ||
      (prevState.exitAlam !== exitAlam && exitAlam)
    ) {
      this.leaveSession();
    }
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
        mainStreamManager: stream,
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

  async joinSession() {
    //Openvidu 객체 생성 하는 코드
    this.OV = new OpenVidu();
    const isStreamer = this.state.myUserName == this.state.mySessionId;
    console.log("isStreamer : " + isStreamer);
    console.log(this.state.myUserName);
    console.log(this.state.mySessionId);

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
        mySession.on("streamCreated", (event) => {
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = [...this.state.subscribers];
          subscribers.push(subscriber);
          console.log("test-subscribers");
          console.log(subscribers);

          this.setState({
            subscribers: subscribers,
          });
        });
        //세션에서 생성되는 이벤트가 발생되면 메서드가 실행된다.
        //스트림이 제거되면 발생하는 메서드
        mySession.on("streamDestroyed", (event) => {
          this.deleteSubscriber(event.stream.streamManager);
        });

        //세션에서 생성되는 카메라 on/off 이벤트가 발생되면 메서드가 실행된다.
        mySession.on("streamPropertyChanged", (event) => {
          if (event.stream && event.changedProperty === "videoActive") {
            const newValue = !this.state.forUpdate;
            this.setState({
              forUpdate: newValue,
            });
          }
        });

        //세션에서 생성되는 이벤트가 발생되면 메서드가 실행된다.
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        this.getToken().then((token) => {
          mySession
            .connect(token, { clientData: this.state.myUserName })
            //토큰을 잘 받아와서 세션에 연결하는 과정
            .then(async () => {
              //비디오 스트림을 생성하는 메서드
              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true, //(this.state.sessionId=this.session.user)?true:false, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: isStreamer ? true : false, //(this.state.sessionId=this.session.user)?true:false, // Whether you want to start publishing with your video enabled or not
                resolution: "640x480", // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });

              //내 세션에 스트림을 등록하는 메서드
              mySession.publish(publisher);

              if (isStreamer) {
                console.log("Is Streamer! ");

                //사용가능한 오디오 및 비디오 디바이스 목록 가져옵니다.
                var devices = await this.OV.getDevices();
                //비디오 입력 디바이스만 필터링
                var videoDevices = devices.filter(
                  (device) => device.kind === "videoinput"
                );
                //스트림의 현재 비디오 디바이스의 id를 가져온다.
                var currentVideoDeviceId = publisher.stream
                  .getMediaStream()
                  .getVideoTracks()[0]
                  .getSettings().deviceId;
                //스트림의 현재 비디오 디바이스를 가져온다.
                var currentVideoDevice = videoDevices.find(
                  (device) => device.deviceId === currentVideoDeviceId
                );
              } else {
                var currentVideoDevice = undefined;
              }

              //비디오 디바이스,메인스트림 매니저, 퍼블리셔 등록
              this.setState({
                currentVideoDevice: currentVideoDevice,
                mainStreamManager:
                  this.state.subscribers.length > 0
                    ? this.state.subscribers[0]
                    : publisher,
                publisher: publisher,
              });
            })
            .catch((error) => {
              console.log(
                "There was an error connecting to the session:",
                error.code,
                error.message
              );
            });
        });
      }
    );
  }

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    this.OV = null;
    this.setState({
      mySessionId: "",
      myUserName: "",
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
    });
  }

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices();
      var videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== this.state.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = this.OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: this.state.audioOn,
            publishVideo: true,
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(this.state.mainStreamManager);

          await this.state.session.publish(newPublisher);
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
    console.log("Camera ON/Off");

    console.log(this.subscribers);

    const newCameraOn = !this.state.cameraOn; // 카메라 토글
    const newPublisher = this.state.publisher;

    if (newPublisher) {
      newPublisher.publishVideo(newCameraOn);
    }
    this.setState({
      cameraOn: newCameraOn,
    });
  }

  //오디오(마이크) 끄기/켜기
  async toggleAudio(e) {
    console.log("Audio ON/Off");
    const newAudioOn = !this.state.audioOn; //마이크토글

    const newPublisher = this.state.publisher;

    if (newPublisher) {
      newPublisher.publishAudio(newAudioOn); //
    }
    this.setState({
      audioOn: newAudioOn,
    });
  }

  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;
    const cameraOn = this.state.cameraOn;
    const audioOn = this.state.audioOn;
    const isStreamer = this.state.myUserName == this.state.mySessionId;

    return (
      <div className="container">
        {/* 만약 세션이 있다면 아래의 html 코드가 실행된다. */}
        {this.state.session !== undefined ? (
          <div id="session" className="StreamingComponent">
            {/* 비디오 출력 */}
            {isStreamer ? (
              // 자기가 publisher라면 자기 화면 송출
              <div
                className={`stream-container col-md-6 col-xs-6 ${
                  cameraOn ? "" : "displayNone"
                }`}
                onClick={() => this.handleMainVideoStream(this.state.publisher)}
              >
                <UserVideoComponent streamManager={this.state.publisher} />
              </div>
            ) : null}
            {/* subscribers를 돌면서 뿌린다. */}
            {/* 클릭하면 handleMainVideoStream  */}
            {this.state.subscribers.map((sub, i) => (
              // handleMainVideoStream은 mainstream 바꾸는 메서드
              <div
                key={sub.id}
                className={`stream-container ${
                  sub.stream.videoActive ? "" : "displayNone"
                }`}
              >
                {/* 결국에는 화면이 띄워지는 것은 UserVideoComponent 이다. */}

                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
            <div id="session-header" className="buttons">

              <div className="title">{sessionStorage.getItem("title")}</div>
              <div className="micAndSpeak">
                {/* <h1 id="session-title">{mySessionId}</h1> */}
                {isStreamer ? (
                  <div>
                    <button
                      className={cameraOn ? "activeButton" : "disableButton"}
                      onClick={this.toggleCamera}
                    >
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          `/img/live/camera${cameraOn ? "-white" : ""}.png`
                        }
                        alt="카메라"
                      />
                      &nbsp; 카메라 {cameraOn ? "끄기" : "켜기"}
                    </button>
                  </div>
                ) : null}
                <div>
                  <button
                    className={audioOn ? "activeButton" : "disableButton"}
                    onClick={this.toggleAudio}
                  >
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        `/img/live/audio${audioOn ? "-white" : ""}.png`
                      }
                      alt="마이크"
                    />
                    &nbsp;마이크 {audioOn ? "끄기" : "켜기"}
                  </button>
                </div>
              </div>
            </div>
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
    const token = await CheckToken();
    const response = await axios.post(
      `${process.env.REACT_APP_OPENVIDU}/api/sessions`,
      { customSessionId: sessionId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    console.log(response.data);
    return response.data; // The sessionId
  }

  async createToken(sessionId) {
    const token = await CheckToken();
    const response = await axios.post(
      `${process.env.REACT_APP_OPENVIDU}/api/sessions/${sessionId}/connections`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    return response.data; // The token
  }
}

export default Streaming;
