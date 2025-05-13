import { formatDateToDMY } from "../../util/dateUtil";
export class MemberLogic{
    public formatMembersDOB(members: { [key: string]: any }[]): { [key: string]: any }[] {
        return members.map((member) => {
          const updatedMember = { ...member };

          if (updatedMember.DOB) {
            updatedMember.DOB = formatDateToDMY(updatedMember.DOB);
          }
    
          if (updatedMember.PlanExpiry) {
            updatedMember.PlanExpiry = formatDateToDMY(updatedMember.PlanExpiry);
          }

          if (updatedMember.LastCheckIn) {
            updatedMember.LastCheckIn = formatDateToDMY(updatedMember.LastCheckIn);
          }
    
          return updatedMember;
        });
      }
}

