# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "debian/stretch64"
  config.vm.provision "shell", path: "bootstrap.sh", privileged: false
  config.vm.hostname = "djangostarter.test"
  config.vm.network :private_network, ip: '192.168.70.10'
  config.vm.synced_folder ".", "/vagrant", type: "virtualbox"

  config.vm.provider "virtualbox" do |v|
    v.cpus = 1
    v.memory = 512
  end
end
