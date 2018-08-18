# The Cooker Project build automation file
# ========================================


# Meta targets
# ------------

.PHONY: default again deploy prod test dev clean

default: dev

again: clean dev


# Real targets
# ------------


deploy: prod
	./deploy.sh

prod:
	npx webpack --mode production

test:
	npx webpack --mode development --config webpack.config.test.js
	npm test

dev:
	npx webpack --mode development

clean:
	rm -rf dist

