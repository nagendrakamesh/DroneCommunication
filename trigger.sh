sleep 150
chmod -R 777 /dev/ttyACM0 
/usr/bin/python3.9 /home/a123/.local/bin/mavproxy.py --master=/dev/ttyACM0 --out udp:127.0.0.1:14450 --out udp:192.168.2.156:14551 --cmd="set flushlogs True" --state-basedir="/home/a123/" --daemon
