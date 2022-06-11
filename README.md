## Getting started

```
git clone https://github.com/skrivanos/django-starter.git
cd django-starter
rm -rf .git
grep "djangostarter" . -Rl|xargs gsed -i 's/djangostarter/PROJECT_NAME/g'
git init
git add .
git commit -m "Initial commit."
```
