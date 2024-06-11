<template>
    <div class="bg">
      <n-tree
        :data="data"
        block-line
        checkable
        default-expand-all
        cascade
        key-field="id"
        label-field="title"
        children-field="children"
        :watch-props="['defaultCheckedKeys']"
        :default-checked-keys="defaultCheckedKeys"
      />
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { NTree } from 'naive-ui'
  
  const defaultCheckedKeys = ref(['1744289488298684418'])
  watch(defaultCheckedKeys.value, () => {
    console.log('defaultCheckedyKeys.value', defaultCheckedKeys.value)
  })
  const data = ref([
    {
      id: '1744288793176682498',
      pId: '0',
      name: '系统管理<font color="#888">&nbsp;&nbsp;&nbsp;management</font>',
      title: '系统管理',
      checked: true,
      open: false,
      nocheck: false,
      children: [
        {
          id: '1744289488298684418',
          pId: '1744288793176682498',
          name: '用户设置<font color="#888">&nbsp;&nbsp;&nbsp;management_user</font>',
          title: '用户设置',
          checked: true,
          open: false,
          nocheck: false,
          children: [
            {
              id: '1744289989589315586',
              pId: '1744289488298684418',
              name: '新增<font color="#888">&nbsp;&nbsp;&nbsp;user_add</font>',
              title: '新增',
              checked: true,
              open: false,
              nocheck: false,
              children: [],
            },
            {
              id: '1744297449192534018',
              pId: '1744289488298684418',
              name: '编辑<font color="#888">&nbsp;&nbsp;&nbsp;user_edit</font>',
              title: '编辑',
              checked: true,
              open: false,
              nocheck: false,
              children: [],
            },
          ],
        },
        {
          id: '1744300916636229633',
          pId: '1744288793176682498',
          name: '角色管理<font color="#888">&nbsp;&nbsp;&nbsp;management_role</font>',
          title: '角色管理',
          checked: true,
          open: false,
          nocheck: false,
          children: [
            {
              id: '1744301517528997889',
              pId: '1744300916636229633',
              name: '新增<font color="#888">&nbsp;&nbsp;&nbsp;role_add</font>',
              title: '新增',
              checked: true,
              open: false,
              nocheck: false,
              children: [],
            },
          ],
        },
        {
          id: '1747075435616628737',
          pId: '1744288793176682498',
          name: '部门管理<font color="#888">&nbsp;&nbsp;&nbsp;management_dept</font>',
          title: '部门管理',
          checked: true,
          open: false,
          nocheck: false,
          children: [
            {
              id: '1747075588285100034',
              pId: '1747075435616628737',
              name: '新增<font color="#888">&nbsp;&nbsp;&nbsp;dept_add</font>',
              title: '新增',
              checked: true,
              open: false,
              nocheck: false,
              children: [],
            },
          ],
        },
        {
          id: '1747151275389972482',
          pId: '1744288793176682498',
          name: '菜单管理<font color="#888">&nbsp;&nbsp;&nbsp;management_menu</font>',
          title: '菜单管理',
          checked: true,
          open: false,
          nocheck: false,
          children: [
            {
              id: '1747151484589273090',
              pId: '1747151275389972482',
              name: '新增<font color="#888">&nbsp;&nbsp;&nbsp;menu_add</font>',
              title: '新增',
              checked: true,
              open: false,
              nocheck: false,
              children: [],
            },
            {
              id: '1747151639677857793',
              pId: '1747151275389972482',
              name: '编辑<font color="#888">&nbsp;&nbsp;&nbsp;menu_edit</font>',
              title: '编辑',
              checked: true,
              open: false,
              nocheck: false,
              children: [],
            },
            {
              id: '1747151732879486977',
              pId: '1747151275389972482',
              name: '删除<font color="#888">&nbsp;&nbsp;&nbsp;menu_del</font>',
              title: '删除',
              checked: true,
              open: false,
              nocheck: false,
              children: [],
            },
          ],
        },
        {
          id: '1747185288884342785',
          pId: '1744288793176682498',
          name: '字典管理<font color="#888">&nbsp;&nbsp;&nbsp;management_dict</font>',
          title: '字典管理',
          checked: true,
          open: false,
          nocheck: false,
          children: [],
        },
      ],
    },
    {
      id: '1747075875787862018',
      pId: '0',
      name: '项目管理<font color="#888">&nbsp;&nbsp;&nbsp;project_management</font>',
      title: '项目管理',
      checked: true,
      open: false,
      nocheck: false,
      children: [],
    },
    {
      id: '1747476448148271105',
      pId: '0',
      name: '首页<font color="#888">&nbsp;&nbsp;&nbsp;home</font>',
      title: '首页',
      checked: true,
      open: false,
      nocheck: false,
      children: [],
    },
  ])
  </script>
  <style>
  .bg {
    width: 1000px;
    height: 1000px;
    background-color: rgb(253, 253, 253);
  }
  </style>
  