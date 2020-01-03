import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import UserManage from './UserManage';

import LoginForm from './Login';
import ChangeMessage from './UserManage/ChangeMessage';

import CourseManage from './UserManage/CourseManage';
import TeacherManage from './UserManage/TeacherManage';
import DepartmentManage from './UserManage/DepartmentManage';
import GradeManage from './UserManage/GradeManage';
import ClassManage from './UserManage/ClassManage';
import TeacherCourseManage from './UserManage/TeacherCourse';
import StudentCourseManage from './UserManage/StudentCourse';
import StudentManage from './UserManage/StudentManage';
import HistoryLibrary from './UserManage/HistoryLibrary';
import HomePage from './HomePage';


import ErrorPage from './ErrorPage';
const history = createBrowserHistory();

export const OuterRoute = [{
  route: '/',
  exact: true,
  component: LoginForm,
}, {
  route: '/userManage',
  component: UserManage,
  children: [
    {
      route: '/userManage',
      exact: true,
      component: HomePage,
      text: '首页'
    },{
    route: '/userManage/course-manage',
    exact: true,
    component: CourseManage,
    text: '课程管理'
  }, {
    route: '/userManage/teacher-manage',
    exact: true,
    component: TeacherManage,
    text: '教师管理'
  }, {
    route: '/userManage/department-manage',
    exact: true,
    component: DepartmentManage,
    text: '院系管理'
  }, {
    route: '/userManage/grade-manage',
    exact: true,
    component: GradeManage,
    text: '年级管理'
  },{
    route: '/userManage/class-manage',
    exact: true,
    component: ClassManage,
    text: '班级管理'
  },{
    route: '/userManage/student-manage',
    exact: true,
    component: StudentManage,
    text: '学生管理'
  },{
    route: '/userManage/changeUsrMes',
    exact: true,
    component: ChangeMessage,
    text: '账户管理'
  },{
    route: '/userManage/history-library',
    exact: true,
    component: HistoryLibrary,
    text: '历史库'
  },{
    route: '/userManage/teacher-course-manage',
    exact: true,
    component: TeacherCourseManage,
    text: '教师课程管理'
  },{
    route: '/userManage/student-course-manage',
    exact: true,
    component: StudentCourseManage,
    text: '学生选课'
  },{
    component: ErrorPage
  }]
}, {
  component: ErrorPage
}]

export default class RouteIndex extends Component {

  render () {
    return (
      <Router history={history}>
        <Switch>
          {
            OuterRoute.map((router, index) => {
              const { exact = false, component, route } = router;
              return (
                <Route exact={exact} path={route ? route : null} key={index} component={component} />
              )
            })
          }
        </Switch>
      </Router>
    )
  }
}
