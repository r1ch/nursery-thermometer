from envirophat import weather
from envirophat import light
import sys, time

while True:
	readings = {
		"temperature" : weather.temperature(),
		"light" : light.light(),
		"pressure" : weather.pressure()
			}
	print(readings)
	sys.stdout.flush()
	time.sleep(1)
