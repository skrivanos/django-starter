# Django Starter

## Getting started

## Prepare new repo
```
git clone https://github.com/skrivanos/django-starter.git myapp
cd myapp
rm -rf .git
git init
git add .
git commit -m "Initial commit."
```


## Install deps and venv

```
pip install poetry 
poetry install
```

## Install pre-commit hooks
```
poetry shell
pre-commit install
pre-commit install --hook-type commit-msg
```
