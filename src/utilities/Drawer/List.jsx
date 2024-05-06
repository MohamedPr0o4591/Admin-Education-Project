import {
  AddHomeWorkOutlined,
  AddTaskOutlined,
  AssignmentLateOutlined,
  AutoStories,
  HomeOutlined,
  HomeWorkOutlined,
  ManageAccountsOutlined,
  MenuBookOutlined,
  QuizRounded,
  ReceiptOutlined,
  SchoolRounded,
  Settings,
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
  {
    title: "إدارة المهام (PDF)",
    icon: <HomeWorkOutlined />,
    path: "/admin/homework-management",
  },
];

export const list3 = [
  {
    title: "إنشاء  امتحان",
    icon: <QuizRounded />,
    path: "/admin/create",
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
  {
    title: "إعداد الصفوف",
    icon: <Settings />,
    path: "/admin/preparation-classes",
  },
];
