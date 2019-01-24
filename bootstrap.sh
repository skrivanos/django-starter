# Fix NOPASSWD sudoers
sudo sed 's@ALL$@NOPASSWD\:ALL@' -i /etc/sudoers

# Fix locale
sudo update-locale LANGUAGE=en_US.UTF-8 LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8
sudo locale-gen en_US.UTF-8

# Packages
sudo apt-get update -y
sudo apt-get install -y build-essential \
                        vim \
                        curl \
                        git \
                        mercurial \
                        subversion \
                        htop \
                        postgresql-9.6 \
                        postgresql-server-dev-9.6 \
                        redis-server \
                        software-properties-common \
                        libgeoip-dev \
                        python3 \
                        python3-dev

# Set default python version
sudo update-alternatives --install /usr/bin/python python /usr/bin/python2 10
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 20

# Add Node repo
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install nodejs

# Install pip
sudo curl --silent --show-error --retry 5 https://bootstrap.pypa.io/get-pip.py | sudo python3

# Install celery
sudo pip3 install celery

# Install project requirements
sudo pip3 install -r /vagrant/requirements.txt
sudo pip3 install -r /vagrant/requirements-dev.txt

# Setup the app db
sudo -u postgres psql -c "CREATE ROLE vagrant PASSWORD 'vagrant' SUPERUSER CREATEDB CREATEROLE INHERIT LOGIN"
createdb -O vagrant vagrant

# Log dirs
sudo mkdir /var/log/app
sudo chown vagrant:vagrant /var/log/app

# Install NPM stuff
sudo npm install -g stripe-local
