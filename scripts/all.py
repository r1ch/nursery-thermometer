from envirophat import weather
from envirophat import light


temperature = weather.temperature()
light = light.light()
pressure = weather.pressure()

print "{ \"temperature\": " + str(temperature) + ", \"light\": " + str(light) + ", \"pressure\": " + str(pressure) + " }"

