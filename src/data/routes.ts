export const ROUTES = {
  login:        '/web/index.php/auth/login',
  logout:       '/web/index.php/auth/logout',
  dashboard:    '/web/index.php/dashboard/index',
  admin:        '/web/index.php/admin/viewAdminModule',
  pim:          '/web/index.php/pim/viewPimModule',
  leave:        '/web/index.php/leave/viewLeaveModule',
  myInfo:       '/web/index.php/pim/viewMyDetails',
  assignLeave:  '/web/index.php/leave/assignLeave',
  leaveList:    '/web/index.php/leave/viewLeaveList',
  timesheets:   '/web/index.php/time/viewEmployeeTimesheet',
} as const;
