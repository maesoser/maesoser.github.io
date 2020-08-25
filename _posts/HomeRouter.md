---
layout: post
title: Difference between font formats
description: What is the difference between various font formats?
summary: What is the difference between various font formats?
comments: true
tags: [typography]
---

## Intro

## Configuration

```json
{
	"name" : "hyperion"
    "wan_addr" : 192.168.0.2
	"wan_port" : "enp5s0"
    "wifi_pwd" : "thisisatest"
	"lan_net": [
		{
			"name" : "lanbr"
			"devices" : ["enp1s0", "enp2s0", "enp3s0", "enp4s0", "enp5s0"]
			"net" : 192.168.0.1
			"mask" : 255.255.255.0
		}
	]
}
```

## Design

Routerd must have an API endpoint

Routerd must have a prometheus endpoint

```bash
routerd_client_rx_bytes{"mac":"XX:XX:XX", "addr" : "192.12.1.2", "alias" : "adasd" , "iface": "lanbr" }
routerd_client_tx_bytes{"mac":"XX:XX:XX", "addr" : "192.12.1.2", "alias" : "adasd" , "iface" : "lanbr"}
routerd_client_dhcp_lease{"mac":"XX:XX:XX", "addr" : "192.12.1.2", "alias" : "adasd" , "iface" : "lanbr"}


```



Routerd should have a web interface

Routerd should include DHCP server

Routerd should configure interfaces

RT5370 adapter