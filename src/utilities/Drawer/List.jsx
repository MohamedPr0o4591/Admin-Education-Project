import {
  AddHomeWorkOutlined,
  AddTaskOutlined,
  AssignmentLateOutlined,
  AutoStories,
  HomeOutlined,
  HomeWorkOutlined,
  ManageAccountsOutlined,
  MenuBookOutlined,
  ReceiptOutlined,
  SchoolRounded,
} from "@mui/icons-material";

export const list1 = [
  {
    title: "الصفحة الرئيسية",
    icon: <HomeOutlined />,
    path: "/admin/",
  },
  {
    title: "إدارة الطلاب",
    icon: <ManageAccountsOutlined />,
    path: "/admin/students-management",
  },
];

export const list2 = [
  {
    title: "الكتب والمذكرات",
    icon: <AutoStories />,
    path: "/admin/books-lectures",
  },
  {
    title: "شرح المنهج",
    icon: <MenuBookOutlined />,
    path: "/admin/course",
  },

  {
    title: "فهرس المشروحات",
    icon: <ReceiptOutlined />,
    path: "/admin/course-content",
  },
];

export const list3 = [
  {
    title: "إنشاء واجب / امتحان",
    icon: <AddHomeWorkOutlined />,
    path: "/admin/create",
  },
  {
    title: "الواجبات المنزلية",
    icon: <HomeWorkOutlined />,
    path: "/admin/homework-management",
  },
  {
    title: "إدارة الإمتحانات",
    icon: <AssignmentLateOutlined />,
    path: "/admin/exam-management",
  },
];

export const list4 = [
  {
    title: "جاوب وإكسب",
    icon: <SchoolRounded />,
    path: "/admin/bonus",
  },
];
