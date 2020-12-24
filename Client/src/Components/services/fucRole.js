//Check ROLE
export default function checkRole(role) {
    var roleName;
    switch (role) {
        case "ROLE_ADMIN":
            roleName ="Administrator"
            break;
        case "ROLE_SEE":
            roleName = "User"
            break;
        case "ROLE_CONTROL":
            roleName ="Control"
            break;
        case "ROLE_MANAGER":
            roleName ="Manager"
            break;

        default:
            roleName = "User"
            break;
    }
    return roleName
  }
  
  
  