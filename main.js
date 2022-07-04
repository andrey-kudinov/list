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

// set the dimensions and margins of the diagram
const margin = { top: 20, right: 90, bottom: 30, left: 90 },
  width = 660 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom

// declares a tree layout and assigns the size
const treemap = d3.tree().size([height, width])

//  assigns the data to a hierarchy using parent-child relationships
let nodes = d3.hierarchy(data[0], d => d.nodes)

// maps the node data to the tree layout
nodes = treemap(nodes)

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
const svg = d3
    .select('body')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom),
  g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// adds the links between the nodes
const link = g
  .selectAll('.link')
  .data(nodes.descendants().slice(1))
  .enter()
  .append('path')
  .attr('class', 'link')
  .style('stroke', 'orange')
  .attr('d', d => {
    return (
      'M' +
      d.y +
      ',' +
      d.x +
      'C' +
      (d.y + d.parent.y) / 2 +
      ',' +
      d.x +
      ' ' +
      (d.y + d.parent.y) / 2 +
      ',' +
      d.parent.x +
      ' ' +
      d.parent.y +
      ',' +
      d.parent.x
    )
  })

// adds each node as a group
const node = g
  .selectAll('.node')
  .data(nodes.descendants())
  .enter()
  .append('g')
  .attr('class', d => 'node' + (d.children ? ' node--internal' : ' node--leaf'))
  .attr('transform', d => 'translate(' + d.y + ',' + d.x + ')')

// adds the circle to the node
node.append('circle').attr('r', 7.5).style('stroke', 'grey').style('fill', 'green')

// adds the text to the node
node
  .append('text')
  .attr('dy', '.35em')
  .attr('x', d => (d.nodes ? (7.5 + 5) * -1 : 7.5 + 5))
  .attr('y', d => (d.nodes && d.depth !== 0 ? -(7.5 + 5) : d))
  .style('text-anchor', d => (d.nodes ? 'end' : 'start'))
  .text(d => d.data.title)
