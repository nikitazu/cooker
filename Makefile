# The Cooker Project build automation file
# ========================================

IMAGES=$(shell find img/ -type f -name '*.s.png')
CRUSHED_IMAGES=$(IMAGES:.s.png=.m.png)
PNGCRUSH_FLAGS=-fix -l9 -m0 -rem alla -brute

# Meta targets
# ------------

.PHONY: default again deploy prod test dev clean

default: dev

again: clean dev


# Real targets
# ------------


deploy: prod
	./deploy.sh

prod: $(CRUSHED_IMAGES)
	npx webpack --mode production

test:
	npx webpack --mode development --config webpack.config.test.js
	npm test

dev: $(CRUSHED_IMAGES)
	npx webpack --mode development

clean:
	rm -rf dist

%.m.png : %.s.png
	pngcrush $(PNGCRUSH_FLAGS) "$<" "$@"

