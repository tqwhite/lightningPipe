{"query":"create table Enrollments as select distinct 'v2.4 enrollment staff primary' as version,  ss.courseNumber || '_' || ss.publicId as courseId, ss.staffUniqueIdentifier as personId,  case when ss.PrimaryInstructorFlag='Y' then 'editingteacher'  else 'teacher' end as role,   c.courseAbbreviation || '_' ||  s.schoolYearBegin || '_' ||  s.schoolYearEnd || '_' ||  s.termAbbreviation as 'classGroup',  stl.termList as termList    from Course as c left join Section_Staff as ss on ss.courseNumber=c.courseNumber left join Section as s on s.sectionNumber=ss.sectionNumber left join Section_TermList as stl on stl.courseNumber=ss.courseNumber  where trim(personId) <> '' and trim(personId) <> '' and trim(classGroup) <> ''  and trim(courseId) <> '' and ss.PrimaryInstructorFlag='Y'"},
{"query":"insert into Enrollments select distinct 'v2.4 enrollment students primary' as version,  c.courseNumber || '_' || ss.publicId as courseId, sst.studentUniqueIdentifier as personId, 'student' as role, s.termAbbreviation || '_' || s.beginningPeriodNumber as 'classGroup',  stl.termList as termList   from Course as c left join Section_Staff as ss on ss.courseNumber=c.courseNumber left join Section as s on s.sectionNumber=ss.sectionNumber left join Section_Student as sst on sst.sectionNumber=s.sectionNumber left join Section_TermList as stl on stl.courseNumber=ss.courseNumber  where trim(personId) <> '' and trim(personId) <> '' and trim(classGroup) <> ''"},
{"query":"create table NewCourses as select distinct 'v2.4 new courses primary' as version,  c.courseDesc || '_' || ss.lastName || '_' || ss.firstName as courseName, c.courseAbbreviation || '_' || ss.publicId as shortName, ss.courseNumber || '_' || ss.publicId as courseId, c.courseDesc as summary,  '' as template, ss.schoolCode as categoryPath, ss.schoolCode as categoryId, ss.schoolCode as categoryName, ss.schoolCode as categoryDescription, '' as startDate, '' as visibility  from Course as c left join Section as s on s.courseNumber=c.courseNumber left join Section_Staff as ss on ss.sectionNumber=s.sectionNumber  where trim(courseName) <> '' and trim(shortName) <> '' and trim(courseId) <> ''"},
{"query":"create table Users as select distinct 'v2.4 user staff primary and secondary' as version,  j.staffUniqueIdentifier as personId, j.staffUniqueIdentifier as userName, 'Te$tUs3r' as password, j.firstName as firstName, j.lastName as lastName, j.lastName || '_' || j.firstName || '@emailaddress.edu' as email,  '' as city, '' as street, '' as phone1, '' as phone2, '' as grade, '' as gradYear,  j.schoolCode as schoolCode, 'STAFF' as department, 'US' as country, '' as description  from JMC_User as j  where trim(personId) <> '' and trim(userName) <> '' and trim(password) <> '' and trim(firstName) <> '' and trim(lastName) <> '' and trim(email) <> '' "},
{"query":"insert into Users select distinct 'v2.4 user students primary' as version,   sb.studentUniqueIdentifier as personId, sb.lastName || '_' || sb.firstName || '_' || substr(sb.studentUniqueIdentifier, 0, 4) as userName, sb.lastName as password, sb.firstName as firstName, sb.lastName as lastName, sb.lastName || '_' || sb.firstName || '@emailadr.edu' as email, ac.city as city, ac.address1 as street, ac.contactPhone1 as phone1, ac.contactPhone2 as phone2, sb.gradeLevelLevel as grade, sb.graduationYear as gradYear, sb.schoolCode as schoolCode, 'STUDENT' as department, 'US' as country, '' as description   from Student_Base as sb left join Address_Contact as ac on  (ac.studentUniqueIdentifier=sb.studentUniqueIdentifier and LOWER(ac.addressTypeCode)=LOWER('primary1'))  where trim(personId) <> '' and trim(userName) <> '' and trim(password) <> '' and trim(firstName) <> '' and trim(lastName) <> '' and trim(email) <> ''  "}
