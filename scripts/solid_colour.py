import sys
import blinkt
print(sys.argv)
blinkt.set_clear_on_exit(False)
blinkt.set_all(int(sys.argv[1]), int(sys.argv[2]), int(sys.argv[3]), float(sys.argv[4]))
blinkt.show()
