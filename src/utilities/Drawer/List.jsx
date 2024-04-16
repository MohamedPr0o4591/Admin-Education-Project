import {
  AddHomeWorkOutlined,
  AddTaskOutlined,
  AssignmentLateOutlined,
  HomeOutlined,
  HomeWorkOutlined,
  ManageAccountsOutlined,
  MenuBookOutlined,
  ReceiptOutlined,
} from "@mui/icons-material";

export const list1 = [
  {
    title: "الصفحة الرئيسية",
    icon: <HomeOutlined />,
    path: "/",
  },
  {
    title: "إدارة الطلاب",
    icon: <ManageAccountsOutlined />,
    path: "/students-management",
  },
];

export const list2 = [
  {
    title: "شرح المنهج",
    icon: <MenuBookOutlined />,
    path: "/course",
  },
  {
    title: "فهرس المشروحات",
    icon: <ReceiptOutlined />,
    path: "/course-content",
  },
];

export const list3 = [
  {
    title: "إنشاء واجب منزلي",
    icon: <AddHomeWorkOutlined />,
    path: "/create-homework",
  },
  {
    title: "الواجبات منزلية",
    icon: <HomeWorkOutlined />,
    path: "/homeworks",
  },
];

export const list4 = [
  {
    title: "إنشاء امتحان",
    icon: <AddTaskOutlined />,
    path: "add-exam",
  },
  {
    title: "إدارة الإمتحانات",
    icon: <AssignmentLateOutlined />,
    path: "manage-exams",
  },
];
