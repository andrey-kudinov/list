const data = [
  {
    title: 'Node 1',
    nodes: [
      {
        title: 'Node 1.1',
        nodes: [
          {
            title: 'Node 1.1.1',
            nodes: [
              {
                title: 'Node 1.1.1.1',
                nodes: null
              },
              {
                title: 'Node 1.1.1.2',
                nodes: null
              },
              {
                title: 'Node 1.1.1.3',
                nodes: null
              },
              {
                title: 'Node 1.1.1.4',
                nodes: null
              }
            ]
          }
        ]
      },
      {
        title: 'Node 1.2',
        nodes: [
          {
            title: 'Node 1.2.1',
            nodes: null
          },
          {
            title: 'Node 1.2.2',
            nodes: null
          },
          {
            title: 'Node 1.2.3',
            nodes: null
          },
          {
            title: 'Node 1.2.4',
            nodes: null
          }
        ]
      }
    ]
  }
]

const createNode = (nodes, box) => {
  if (nodes?.length) {
    const container = document.createElement('div')
    container.classList.add('container')

    nodes.forEach(node => {
      const nodeElement = document.createElement('div')
      nodeElement.innerHTML = `
        <div class='card'>
          <div class='header'><h2>${node.title}</h2></div>
          <div class='body'>body</div>
        <div/>
      `

      createNode(node.nodes, container)
      box ? box.append(nodeElement) : document.body.append(nodeElement)
    })
    if (box) {
      document.body.append(box)
    }
  }
}

createNode(data)
