---
layout: post
title: Bonding en linux
description: Configurar una interfaz inallámbrica como secundaria en linux
summary: Configurar una interfaz inallámbrica como secundaria en linux
comments: true
tags: [linux, networking]
---

## Intro

En este pequeño post vamos a hablar sobre cómo configurar dos interfaces de linux para que actúen como una interfaz unificada, lo que se conoce como "bonding".

En mi caso esta posibilidad me conviene porque me permite configurar dos interfaces con la misma dirección IP en la pequeña placa ARM que uso para mis experimentos. No es una placa que tenga conectada siempre, o que tenga siempre en el mismo sitio. Gracias a esta configuración puedo usar un cable Ethernet para trabajar en ella o desconectarla y llevármela a otro punto de la casa sin que esto suponga ningún problema a la hora de operar en ella.

Para lograr ese comportamiento he elegido el modo de bonding "activo-pasivo". Existen otros modos[^1] que permiten configurar las interfaces para conseguir más disponibilidad o más rendimiento.

Lo primero será preparar los elementos necesarios en nuestro equipo:

```bash
sudo modprobe bonding
sudo lsmod | grep bonding
sudo echo "bonding" /etc
sudo apt-get install -y ifenslave
```

## Configurando las interfaces esclavas

```
allow-bond0 eth0
auto eth0
  iface eth0 inet manual
  bond-master bond0
  bond-primary eth0

allow-hotplug wlan0
  auto wlan0
  iface wlan0 inet manual
  bond-master bond0
  bond-primary eth0
  wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf
  wireless-mode Managed
  wireless-power off
```

En el caso de la interfaz de wireless también tendremos que modificar el archivo `/etc/wpa_supplicant/wap_supplicant.conf` para añadir el nombre y la contraseña de la red wifi a la que queramos conectarnos.

```
ctrl_interface=/run/wpa_supplicant
update_config=1

network={
  ssid="wifi_name"
  psk="wifi_passphrase"
}
```



## Configurando la interfaz de bond0

La interfaz de bond es la que va a estar operativa a nivel de capa 3 por lo que será en ella donde coloquemos la configuración IP. También hemos configurado algunos temporizadores como el tiempo entre chequeos (`bond-miimon`) y el tiempo que tiene que pasar para que una interfaz se marque como disponible o caída (`bond-updelay` y `bond-downdelay`).

```
auto bond0
iface bond0 inet static
  address 192.168.0.4
  netmask 255.255.255.0
  gateway 192.168.0.1 
  dns-nameservers 8.8.8.8 1.0.0.1
  slaves eth0 wlan0
  bond-mode active-backup
  bond-miimon 100
  bond-downdelay 200
  bond-updelay 200
  bond-slaves none
```



## Comprobando el bond

Para comprobar el bond podemos utilizar

```bash
cat /proc/net/bonding/bond0
```



## Referencias

[^1] [What are the Network Bonding Modes In CentOS / RHEL](https://www.thegeekdiary.com/what-are-the-network-bonding-modes-in-centos-rhel/)

[Linux Ethernet Bonding Driver HOWTO](https://www.kernel.org/doc/Documentation/networking/bonding.txt)