import { Stack, useTheme } from "@mui/material";
import React, { useState } from "react";
import HeaderLine from "../../../components/headerLine/HeaderLine";
import StudentCard from "../../../components/pages/home/StudentCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllStatistics } from "../../../Redux/actions/Actions";

function HomePageContent() {
  const statisticsData = useSelector((state) => state.STATISTICS.statistics);
  const dispatch = useDispatch();
  const [staticsDetails, setStaticsDetails] = useState([]);

  React.useEffect(() => {
    dispatch(getAllStatistics());
  }, []);

  React.useEffect(() => {
    let arr1 = statisticsData.filter((item) =>
      item.name.includes("الابتدائى" || "الابتدائي")
    );

    let arr2 = statisticsData.filter((item) =>
      item.name.includes("الاعدادى" || "الاعدادي")
    );

    let arr3 = statisticsData.filter((item) =>
      item.name.includes("الثانوى" || "الثانوي")
    );

    setStaticsDetails({
      arr1,
      arr2,
      arr3,
    });
  }, [statisticsData]);

  return (
    <div className="home-page-content">
      <HeaderLine title="جميع الاحصائيات" />

      {statisticsData.length > 0 ? (
        <div className="d-flex flex-column gap-4">
          {staticsDetails.arr1?.length > 0 && (
            <div className="d-flex flex-column gap-4">
              <span className="fs-3 text-primary">الصفوف الابتدائبة</span>
              <Stack
                direction={"row"}
                gap={2}
                alignItems={"center"}
                flexWrap={"wrap"}
              >
                {staticsDetails.arr1?.map((item, index) => {
                  return (
                    <StudentCard
                      key={index}
                      level={item.name}
                      groups={item.groupsCount}
                      students={item.studentsCount}
                      units={item.unitsCount}
                    />
                  );
                })}
              </Stack>
            </div>
          )}

          {staticsDetails.arr2?.length > 0 && (
            <div className="d-flex flex-column gap-4">
              <span className="fs-3 text-primary">الصفوف الاعدادية</span>
              <Stack
                direction={"row"}
                gap={2}
                alignItems={"center"}
                flexWrap={"wrap"}
              >
                {staticsDetails.arr2?.map((item, index) => {
                  return (
                    <StudentCard
                      key={index}
                      level={item.name}
                      groups={item.groupsCount}
                      students={item.studentsCount}
                      units={item.unitsCount}
                    />
                  );
                })}
              </Stack>
            </div>
          )}

          {staticsDetails.arr3?.length > 0 && (
            <div className="d-flex flex-column gap-4">
              <span className="fs-3 text-primary">الصفوف الثانوية</span>
              <Stack
                direction={"row"}
                gap={2}
                alignItems={"center"}
                flexWrap={"wrap"}
              >
                {staticsDetails.arr3?.map((item, index) => {
                  return (
                    <StudentCard
                      key={index}
                      level={item.name}
                      groups={item.groupsCount}
                      students={item.studentsCount}
                      units={item.unitsCount}
                    />
                  );
                })}
              </Stack>
            </div>
          )}
        </div>
      ) : (
        <span>لا توجد بيانات</span>
      )}
    </div>
  );
}

export default HomePageContent;
