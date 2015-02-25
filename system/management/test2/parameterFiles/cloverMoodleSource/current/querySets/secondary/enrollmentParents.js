create table Enrollments as
select distinct
'v2.13 enrollment parents secondary' as version,

c.courseNumber || '_' || ss.publicId as courseId,
ac.personId as personId,
'parent' as role,

s.termAbbreviation || '_' || s.beginningPeriodNumber as 'classGroup'

from Address_Contact as ac
left join Section_Student as sst on sst.studentUniqueIdentifier=ac.studentUniqueIdentifier
left join Section as s on (s.sectionNumber=sst.sectionNumber and sst.courseNumber=s.courseNumber and s.schoolCode=sst.schoolCode)
left join Section_Staff as ss on (ss.sectionNumber=s.sectionNumber and sst.courseNumber=s.courseNumber and ss.schoolCode=sst.schoolCode)
left join Course as c on (c.courseNumber=s.courseNumber and sst.courseNumber=s.courseNumber and c.schoolCode=sst.schoolCode)

where trim(personId) <> ''
and trim(personId) <> ''
and trim(classGroup) <> ''