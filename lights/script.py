import sys
import blinkt

while True:
    	args = sys.stdin.readline().split(",")
	blinkt.set_all(int(args[0]), int(args[1]), int(args[2]), float(args[3]))
	blinkt.show()
