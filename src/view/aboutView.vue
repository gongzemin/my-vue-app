<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'

import G6 from '@antv/g6'

let chartData = {
  downCount: 0, // 直接下游层数
  upCount: 1, // 直接上游层数
  upList: [
    // -- 上游列表
    {
      tableId: 18,
      dataBaseName: 'test',
      tableName: '上游表1',
      creator: 'ssitg',
      createTime: '2024-03-25 11:28:32',
      childs: null,
    },
    {
      tableId: 19,
      dataBaseName: 'test',
      tableName: '上游表2',
      creator: 'ssitg',
      createTime: '2024-03-25 11:28:32',
      childs: null,
    },
    {
      tableId: 20,
      dataBaseName: 'test',
      tableName: '上游表3',
      creator: 'ssitg',
      createTime: '2024-03-25 11:28:32',
      childs: null,
    },
  ],
  downList: [
    {
      tableId: 11,
      dataBaseName: 'test',
      tableName: '下游表1',
      creator: 'ssitg',
      createTime: '2024-03-25 11:28:32',
      childs: null,
    },
  ], // --下游列表
  tableName: 'aaaaa',
  tableId: 1,
  dataBaseName: 'test',
  creator: 'ssitg',
  createTime: '2024-03-25 11:28:32',
  childs: null,
}

type Node = {
  id: string
  label: string
}
type Edge = {
  source: string
  target: string
}

let dagreData = reactive({
  nodes: [] as Node[],
  edges: [] as Edge[],
})

const getNodeData = () => {
  let arr = []
  arr.push({
    id: String(chartData.tableId),
    label: chartData.tableName,
  })
  const setNode = data => {
    data.forEach(d => {
      arr.push({
        id: String(d.tableId),
        label: d.tableName,
      })
      if (d.childs?.length) {
        setNode(d.childs)
      }
    })
  }
  if (chartData.upList?.length) {
    setNode(chartData.upList)
  }
  if (chartData.downList?.length) {
    setNode(chartData.downList)
  }
  console.log('aaaa-', arr)
  dagreData.nodes = arr
  let edges = [] as Edge[]
  if (chartData.upList?.length) {
    chartData.upList.forEach(up => {
      edges.push({
        source: String(up.tableId),
        target: String(chartData.tableId),
      })
    })
  }
  if (chartData.downList?.length) {
    chartData.downList.forEach(d => {
      edges.push({
        source: String(chartData.tableId),
        target: String(d.tableId),
      })
    })
  }
  dagreData.edges = edges
}

getNodeData()

const data = {
  nodes: [
    {
      id: '0',
      label: '0',
    },
    {
      id: '1',
      label: '1',
    },
    {
      id: '2',
      label: '2',
    },
    {
      id: '3',
      label: '3',
    },
    {
      id: '4',
      label: '4',
    },
    {
      id: '5',
      label: '5',
    },
    {
      id: '6',
      label: '6',
    },
    {
      id: '7',
      label: '7',
    },
    {
      id: '8',
      label: '8',
    },
    {
      id: '9',
      label: '9',
    },
  ],
  edges: [
    {
      source: '0',
      target: '1',
    },
    {
      source: '0',
      target: '2',
    },
    {
      source: '1',
      target: '4',
    },
    {
      source: '0',
      target: '3',
    },
    {
      source: '3',
      target: '4',
    },
    {
      source: '4',
      target: '5',
    },
    {
      source: '4',
      target: '6',
    },
    {
      source: '5',
      target: '7',
    },
    {
      source: '5',
      target: '8',
    },
    {
      source: '8',
      target: '9',
    },
    {
      source: '2',
      target: '9',
    },
    {
      source: '3',
      target: '9',
    },
  ],
}
const renderDagre = () => {
  const container = document.getElementById('container')
  const width = container.scrollWidth || 1024
  const height = container.scrollHeight || 500
  const graph = new G6.Graph({
    container: 'container',
    width,
    height,
    fitView: true,
    modes: {
      default: ['drag-canvas', 'drag-node'],
    },
    layout: {
      type: 'dagre',
      rankdir: 'LR',
      align: 'UL',
      controlPoints: true,
      nodesepFunc: () => 1,
      ranksepFunc: () => 1,
    },
    defaultNode: {
      size: [30, 20],
      type: 'rect',
      style: {
        lineWidth: 2,
        stroke: '#5B8FF9',
        fill: '#C6E5FF',
      },
    },
    defaultEdge: {
      type: 'polyline',
      size: 1,
      color: '#e2e2e2',
      style: {
        endArrow: {
          path: 'M 0,0 L 8,4 L 8,-4 Z',
          fill: '#e2e2e2',
        },
        radius: 20,
      },
    },
  })
  graph.data(dagreData)
  graph.render()

  graph.on('node:click', e => {
    // if (e.target.get('name') === 'collapse-icon') {
    //   e.item.getModel().collapsed = !e.item.getModel().collapsed
    //   graph.setItemState(
    //     e.item,
    //     'collapsed',
    //     e.item.getModel().collapsed
    //   )
    //   graph.layout()
    // }
    console.log('node-----click', e)
    const item = e.item // 被操作的节点 item
    const target = e.target // 被操作的具体图形
    if (item?._cfg?.model.id === '20') {
      let res = {
        downCount: 0, // 直接下游层数
        upCount: 1, // 直接上游层数
        upList: [
          // -- 上游列表
          {
            tableId: 118,
            dataBaseName: 'test',
            tableName: '上游表11',
            creator: 'ssitg',
            createTime: '2024-03-25 11:28:32',
            childs: null,
          },
          {
            tableId: 119,
            dataBaseName: 'test',
            tableName: '上游表12',
            creator: 'ssitg',
            createTime: '2024-03-25 11:28:32',
            childs: null,
          },
          {
            tableId: 120,
            dataBaseName: 'test',
            tableName: '上游表13',
            creator: 'ssitg',
            createTime: '2024-03-25 11:28:32',
            childs: null,
          },
        ],
        downList: [
          {
            tableId: 1,
            dataBaseName: 'test',
            tableName: '下游表1',
            creator: 'ssitg',
            createTime: '2024-03-25 11:28:32',
            childs: null,
          },
        ], // --下游列表
        tableName: 'aaaaa',
        tableId: 20,
        dataBaseName: 'test',
        creator: 'ssitg',
        createTime: '2024-03-25 11:28:32',
        childs: null,
      }
      let idList = dagreData.nodes.map(item => item.id)
      if (res.upList?.length > 0) {
        res.upList.forEach(item => {
          if (!idList.includes(String(item.tableId))) {
            dagreData.nodes.push({
              id: String(item.tableId),
              label: item.tableName,
            })
            dagreData.edges.push({
              source: String(item.tableId),
              target: String(res.tableId),
            })
          }
        })
      }
      if (res.downList?.length > 0) {
        res.downList.forEach(item => {
          if (!idList.includes(String(item.tableId))) {
            dagreData.nodes.push({
              id: String(item.tableId),
              label: item.tableName,
            })
            dagreData.edges.push({
              source: String(res.tableId),
              target: String(item.tableId),
            })
          }
        })
      }
      graph.data(dagreData)
      graph.render()
    }
    // 点击节点 看有没有下级节点 有就新增 没有就提示
    // if (!item?._cfg?.model.children || !item?._cfg?.model.children?.length) {
    //   console.log('yellow----', item)
    //   let tableId = Number(item?._cfg?.id)
    //   getBuildBlood({
    //     tableId: tableId,
    //     type: 2,
    //   }).then(res => {
    //     if (res.data?.length && res.data[0] !== null) {
    //       convertData(res.data)
    //       // todo 后台没有返回有下游表的 可能有问题
    //       setChildren(chartDataObj.value.children, item, res.data)
    //     } else {
    //       proxy.$message({
    //         message: `表名${item?._cfg?.model.tableName}没有下游表信息`,
    //         duration: 1000,
    //         type: 'warning',
    //       })
    //       return
    //     }
    //     nextTick(() => {
    //       renderTree()
    //     })
    //   })
    // }
  })

  if (typeof window !== 'undefined')
    window.onresize = () => {
      if (!graph || graph.get('destroyed')) return
      if (!container || !container.scrollWidth || !container.scrollHeight)
        return
      graph.changeSize(container.scrollWidth, container.scrollHeight)
    }
}

onMounted(() => {
  renderDagre()
})
</script>
<template>
  <div id="container"></div>
</template>
<style></style>
