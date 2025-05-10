import { formatDateToDMY } from "../../util/dateUtil";
export class MemberLogic{
    public formatMembersDOB(members: { [key: string]: any }[]): { [key: string]: any }[] {
        return members.map((member) => {
          const updatedMember = { ...member };

          if (updatedMember.DOB) {
            updatedMember.DOB = formatDateToDMY(updatedMember.DOB);
          }
    
          if (updatedMember.RenewalDate) {
            updatedMember.RenewalDate = formatDateToDMY(updatedMember.RenewalDate);
          }
    
          return updatedMember;
        });
      }
}

