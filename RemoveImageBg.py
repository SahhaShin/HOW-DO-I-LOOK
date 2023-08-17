import sys
from io import BytesIO

from rembg import remove
from PIL import Image
import tempfile
import requests


def main(image_path):

    try:
        # 이미지 다운로드
        response = requests.get(image_path[1])
        response.raise_for_status()

        # 다운로드한 이미지를 메모리에 열기
        input_image = Image.open(BytesIO(response.content))

        # 이미지 배경 제거
        output_image = remove(input_image)

        # 임시 파일에 저장
        with tempfile.NamedTemporaryFile(suffix='.png', delete=False) as output_temp_file:
            output_temp_file_path = output_temp_file.name
            output_image.save(output_temp_file_path, format='PNG')

            print(output_temp_file_path)

    except Exception as e:
        print("배경 제거한 이미지 저장한 경로 불러오기 실패:", str(e))



if __name__ == "__main__":
    main(sys.argv)