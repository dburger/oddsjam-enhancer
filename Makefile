zipname = oddsjam-enhancer.zip
clean:
	rm -rf *~
	rm -f ./${zipname}

oddsjam-enhancer.zip: ./src/*
	cd ./src; zip ../${zipname} *

build: ${zipname}
