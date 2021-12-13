#SET SQL_SAFE_UPDATES=0;
#SELECT * FROM User WHERE UserId IN ('24', '2222', '396', '3000');

#SELECT * FROM Mates WHERE RequestId = '24';
#DELETE FROM Mates WHERE ReceiverId = '396';

#SELECT * FROM Message;
#DELETE FROM Message WHERE MessageId = '3';

#SELECT * FROM Reservation WHERE UserId IN ('24', '396');
#DELETE FROM Reservation WHERE UserId IN ('24', '396');

#SELECT * FROM Appointment WHERE StudentId IN ('24', '396');
#DELETE FROM Appointment WHERE StudentId IN ('24', '396');

#SELECT * FROM Enrollment WHERE StudentId in ('24','30', '50');
#DELETE FROM Enrollment WHERE StudentId = '24';

#SELECT * FROM User WHERE UserId = '3000';
#DELETE FROM User WHERE UserId = '3000';