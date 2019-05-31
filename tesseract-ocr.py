#모둘 불러옴
import pytesseract
import lxml.etree as ET
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract'

# tesseract-ocr로 추출한 데이터를 텍스트 파일로 저장
# f = open("C:/Users/WDJ/Desktop/11.txt",'a')
# f.write((pytesseract.image_to_string('1.png',lang='kor')))
# f.close()

# tesseract-ocr로 추출한 데이터를 객체 datas에 저장
datas = (pytesseract.image_to_string('1.png',lang='kor'))

# 최상위 객체 변수 정의
root = ET.Element("Datagroup")
#name 요소 생성, x_name 객체 변수에 대입
x_name = ET.Element("name")
#객체 변수의 text property에 대입
x_name.text = "데이터"
#set 메소드로 속성 추가
x_name.set("alias","DATA")

x_datas = ET.Element("datas")

#데이터를 임시로 저장해 놓기 위한 객체 temp
temp = ''

#반복문
for data in datas:
    #만약에 data가 null이거나 줄바꿈이 아니면 temp에 저장
    if data != ' ' and data != '\n' and data!= '' :
            temp =  temp + data
    #data가 존재시
    else :
        #temp가 null이거나 줄바꿈이 아닐경우에 subElement 생성
        if temp!= ' ' and temp !='\n' and temp!= '' :
            x_data = ET.SubElement(x_datas, "data")
            x_data.text = temp
            temp = ''

#추가된 모든 요소를 반영
root.append(x_name)
root.append(x_datas)

#생성된 XML를 문서화해서 파일로 저장함
x_output = ET.tostring(root, pretty_print = True, encoding='UTF-8')
x_header = '<?xml version="1.0" encoding="UTF-8"?>'
#콘솔 출력
#print(x_header + x_output.decode('UTF-8'))
ff=open('./sample.xml','w',encoding='UTF-8')
ff.write(x_header + x_output.decode('UTF-8'))