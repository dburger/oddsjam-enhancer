clean:
	rm -rf *~
	rm -f ./oddsjam-linker.zip

oddsjam-linker.zip: ./src/*
	cd ./src; zip ../oddsjam-linker.zip *

build: oddsjam-linker.zip
