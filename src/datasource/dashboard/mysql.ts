export class DashboardQueries {
  getMembershipsQuery(): string {
      return  `
     SELECT 
    ID,
    Name,
    RenewalDate,
    CASE
        WHEN RenewalDate > CURDATE() THEN 'Coming Soon'
        WHEN RenewalDate < CURDATE() THEN 'Expired'
        ELSE 'Active'
    END AS Status,
    CASE
        WHEN RenewalDate > CURDATE() THEN DATEDIFF(RenewalDate, CURDATE())
        ELSE NULL
    END AS DaysToBeExpired,
    CASE
        WHEN RenewalDate < CURDATE() THEN DATEDIFF(CURDATE(), RenewalDate)
        ELSE NULL
    END AS DaysSinceExpired
FROM 
    members
WHERE
    RenewalDate IS NOT NULL
ORDER BY 
    RenewalDate;

    `;;
    }
  
    getActivityQuery(): string {
      return `SELECT ID, Name, DATEDIFF(CURDATE(), LastCheckIn) AS LastCheckIn 
      FROM members WHERE LastCheckIn IS NOT NULL`;
    }
  
  }
  