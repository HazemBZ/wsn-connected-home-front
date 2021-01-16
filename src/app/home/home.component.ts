import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { schemeBrBG } from 'd3';
import { Message } from '../models/message.model';

const ENDPOINT = "ws://192.168.1.13:8000/";
const MAX_QEUEU = 60;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public socket = new WebSocket(ENDPOINT);
  // public messages:string[] = [];
  public dates = [];
  public messages: Message[] = [];
  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2)
  private height = 400 - (this.margin * 2)
  public lastMinute = 0;
  public lastDay = 0;
  public lastHour = 0;
  public lastMonth = 0;
  public lastYeat = 0;

  constructor() { }

  ngOnInit(): void {
    this.socket.onopen = (event)=>{
      console.log("Connection established")
      this.socket.send("Hello from angular client");
      this.send("Eat bananas")
    }

    this.socket.onmessage = (event)=>{
      console.log(`[message] received from server: ${event.data}`);
      this.save(event.data)
    }

    // this.createSvg();
    // this.drawScatter();
    setInterval(()=>{this.redraw()},1000)
  }

  send(message){
    console.log(`sending ${message}`)
    this.socket.send(`From angular ${message}`)

  }
  save(message){
    let r_message: Message = JSON.parse(message);
    if(!r_message.topic.includes('temp')) return ;
    if(this.messages.length > MAX_QEUEU) {this.messages.shift();this.dates.shift()}

    r_message.date = new Date();

    this.messages.push(r_message);
      // this.dates.push(new Date())
    this.checkTime(r_message);
  }


  checkTime(message:Message){
    let minute = message.date.getMinutes();
    if( minute != this.lastMinute){
      this.lastMinute = minute;
      this.messages = [];
    }
  }

  filterSave(){
  }




  private createSvg():void {
    d3.select('figure#scatter').select('svg').remove()
    this.svg = d3.select('figure#scatter')
    .append('svg')
    .attr('width', this.width + (this.margin * 2))
    .attr('height', this.height + (this.margin * 2))
    .append('g')
    .attr('transform', "translate(" + this.margin + ',' + this.margin + ")")

    // this.svg = d3.select("figure#bar")
    // .append("svg")
    // .attr("width", this.width + (this.margin * 2))
    // .attr("height", this.height + (this.margin * 2))
    // .append("g")
    // .attr("transform", "translate(" + this.margin + "," + this.margin + ")");

  }

  private drawScatter(){
    // let x = d3.scaleTime()//.scale() // let x = d3.scaleLinear()
    // .domain([this.messages[0].date,this.messages[this.messages.length - 1 ].date]) //[this.messages[0].date,this.messages[this.messages.length - 1 ].date]
    let x = d3.scaleLinear()
    .domain([0,60])
    .range([ 0, this.width ]);
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    // Add Y axis
    let y = d3.scaleLinear()
    .domain([0, 100])
    .range([ this.height, 0]);
    this.svg.append("g")
    .call(d3.axisLeft(y));

    //Add line
    // this.svg.append('path')
    // .datum(this.messages)
    // .attr('fill', 'none')
    // .attr('stroke','#69b3a2')
    // .attr('stroke-width', 1.5)
    // .attr('d', d3.line()
    //   .x((dt)=> dt.date.toSeconds())
    //   .y((dt)=> Number(dt.data))
    //   )

    // Add dots
    let dots = this.svg.append('g');
    dots.selectAll("dot")
    .data(this.messages)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.date.getSeconds()))
    .attr("cy", d => y(Number(d.data)))
    .attr("r", 7)
    .style("opacity", .5)
    .style("fill", "#69b3a2");

    // Add labels
    // dots.selectAll("text")
    // .data(this.messages)
    // .enter()
    // .append("text")
    // .text(d => d.topic)
    // .attr("x", d => x(d.date))
    // .attr("y", d => y(d.data))
  }

  public redraw(){
    this.createSvg()
    this.drawScatter();
  }
}
