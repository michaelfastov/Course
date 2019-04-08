///set pin numbers for leds
 
//power indicator led
int pwr = 6;
 
//controlled leds

int red = 13;

 
///set baudrate for serial connection
int baud = 9600;
 
///set delay time: 1 second
int time = 5000;
 
void setup()
{
  //set pinmode and turn on power led
  pinMode(pwr, OUTPUT);
  digitalWrite(pwr, HIGH);
 
  //start serial
  Serial.begin(baud);
 
  //set pinmode for controlled leds
  pinMode(red, OUTPUT);

}
 
// the loop routine runs over and over and over and over
void loop()
//loop constantly scans for serial input
{
  //when connection is more than 1 begin if statements
  if (Serial.available() > 0)
  {
    //read serial input value
    int val = Serial.read();
    //begin if statement

    if (val == '1')
    {
      digitalWrite(red, HIGH);
      delay(time);
      digitalWrite(red, LOW);
    }

        if (val == '2')
    {
      digitalWrite(red, HIGH);
      delay(500);
      digitalWrite(red, LOW);
      delay(500);
      digitalWrite(red, HIGH);
      delay(500);
      digitalWrite(red, LOW);
      delay(500);
      digitalWrite(red, HIGH);
      delay(500);
      digitalWrite(red, LOW);
      delay(500);
      digitalWrite(red, HIGH);
      delay(500);
      digitalWrite(red, LOW);
      delay(500);
      digitalWrite(red, HIGH);
      delay(500);
      digitalWrite(red, LOW);
    }

       if (val == '3')
    {
      Serial.print('37 C');
    }
    }
    //flush the serial value
    Serial.flush();
  }
