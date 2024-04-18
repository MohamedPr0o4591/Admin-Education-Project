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
    title: "إنشاء واجب / امتحان",
    icon: <AddHomeWorkOutlined />,
    path: "/create",
  },
  {
    title: "الواجبات المنزلية",
    icon: <HomeWorkOutlined />,
    path: "/homeworks",
  },
  {
    title: "إدارة الإمتحانات",
    icon: <AssignmentLateOutlined />,
    path: "manage-exams",
  },
];
