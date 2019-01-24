# Retro Router #

This is a collection of scripts designed to control analog and digital video switches via their RS-232 interfaces. Additional devices are controled through IR via lirc.

## Hardware ##

* Raspberry Pi or other linux based system
* [Gearmo 4port RS232 USB to Serial Adapter](https://www.gearmo.com/shop/professional-4-port-rs232-usb-to-serial-adapter-gm-ftdi4x/)
* [USB Infrared Toy](http://dangerousprototypes.com/docs/USB_Infrared_Toy)
* [Panasonic TC-P65VT30](https://shop.panasonic.com/support-only/TC-P65VT30.html)
* [Extron Crosspoint 450 Plus 128](https://www.extron.com/product/crosspoint450plus128)
* [Monoprice 4x4 Matrix](https://www.monoprice.com/product?c_id=101&cp_id=10113&cs_id=1011310&p_id=15378&seq=1&format=2)
* [Monoprice 8x1 Switch](https://www.monoprice.com/product?c_id=101&cp_id=10110&cs_id=1011002&p_id=4067&seq=1&format=2)
* [OSSC](http://junkerhq.net/xrgb/index.php?title=OSSC)

### Wiringing Digiram ###

![Wiring Diagram](/docs/wiring_diagram.png)

Cables going into the Extron Crosspoint are either system specific HD Retrovision (blue) or Nintendo Wii/WiiU (green) cables with a 6ft HD Retrovision Male-to-Female extension, terminated into [75ohm RCA to BNC](https://www.digikey.com/product-detail/en/cinch-connectivity-solutions-aim-cambridge/CPAD517/J10099-ND/414256). Audio cables are terminated into [Phoenix to RCA Adapter](https://db-electronics.ca/2018/04/23/open-source-extron-phoenix-audio-adapter-pcbs/)

## Software ##

### Device Control ###

The hardware API is built upon [flask](http://flask.pocoo.org/) to create a simple interface with [pyserial](https://github.com/pyserial/pyserial) to send commands to the TV, HDMI Switch, HDMI Matrix, and Extron Crosspoint

To control the OSSC LIRC is used with the USB IR Toy to send IR [remote commands](http://junkerhq.net/xrgb/index.php?title=OSSC_LIRC_Script).

Note: The Monoprice 4x4 matrix seems to be a clone of or cloned by the [Lindy 38152](https://www.lindy-international.com/4x4-HDMI-1-4-10-2G-Matrix-Switch.htm?websale8=ld0101.ld020102&pi=38152). The command codes for the Lindy seem to work correctly with the Monoprice unit as there are no codes on the Monoprice website.

[HDMI Switch Codes](https://web.archive.org/web/20170918094448/http://support.monoprice.com/link/portal/41053/41056/Article/233/What-are-the-RS-232-commands-for-the-8X1-Enhanced-Powered-HDMI-Switcher-w-Remote-PID-4067)

[HDMI Matrix Command Codes](/docs/1459947591Command_codes_for_LINDY_38152.pdf) 

[Crosspoint 450 Codes](/docs/XP_Plus_MAV_D.pdf)

[Panasonic Codes](/docs/RS232C_terminal_codes_consumer_Plasma.pdf)

### UI ###

The UI was written using Vue with the Vueitfy material framework. Logic was written in TypeScript.

Images of the various systems come from the great work done by [Evan Amos](https://twitter.com/VanamoMedia) whose work can be found at https://commons.wikimedia.org/wiki/User:Evan-Amos

Below are some views of the app running in Firefox on an Android phone.

To switch to a source simply tap the system you want from the list.

Sources that case be upscaled will have a toggle when either can be selected.
![Analog & Digital](/docs/analog_and_digital_video.png)

Displays like a CRT will only allow the selection of analog sources
![Analog](/docs/analog_only.png)

While a capture card will allow only digital sources which include upscaled analog sources
![Digital](/docs/digital_only.png)

Different sources (TV, CRT, Capture) can all be selected from the side menu
![Source Selection](/docs/source_selection.png)

### Deployment Notes ###

``` 
Python Dependencies
cp retroRouter.py /var/www/html/
cp requirements.txt /var/www/html/

cd /var/www/html
python3 -m virtualenv env
source env/bin/activate
pip3 install -r requirements.txt
```

```
Nginx Config
cp .deploy/nginx.conf /etc/nginx/sites-available/default 
sudo service ngnix restart
```

```
Gunicon Config
cp .deploy/retro-router.service /etc/supervisor/conf.d/retro-router.conf
sudo service supervisor restart
```

```
LIRC Config
cp .deploy/ossc.conf /etc/lirc/lircd.conf.d/ossc.conf

/etc/lirc/lirc_options.conf
driver = irtoy
device = /dev/ttyACM0

sudo service lircd restart
```

### Limitations ###
* No authentication. Not designed for public IPs.
* Hard coded control logic. To work around this an abstraction for a display, switch, matrix, and upscaler would be needed.
* No querying of control hardware state for dynamic UI updates. The 8x1 switch does not have the ability to query which channel is active or which are even powered on.

### Planned Features ###
* OSSC profile selection per system
* Include more system icon variations from Evan's work
* TV specific functions (Turn on/off, mute, vol up/down, etc)