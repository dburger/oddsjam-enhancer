clean:
	rm -rf *~
	rm -f ./oddsjam-enhancer.zip

oddsjam-enhancer.zip: ./src/*
	cd ./src; zip ../oddsjam-enhancer.zip *

build: oddsjam-enhancer.zip
