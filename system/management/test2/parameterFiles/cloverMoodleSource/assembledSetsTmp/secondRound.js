{"query":"update Enrollments /* v2.13 update courseGroups secondRoundSql*/ set classGroup=(select classGroup from classGroupNames where Enrollments.courseId=classGroupNames.courseId)"},
{"query":"create table /* v2.12 distinct enrollments secondRound */ EnrollmentsDistinct as select distinct * from Enrollments"}
