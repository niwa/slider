import { Component, OnInit, ViewEncapsulation, Input, Output } from '@angular/core';
import * as d3 from 'd3';
import { EventEmitter } from "@angular/common/src/facade/async";


@Component({
    selector: 'niwa-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    encapsulation: ViewEncapsulation.None


})

export class SliderComponent implements OnInit {
    @Input() steps: number;
    @Input() ticks: number;

    @Output() onSelectedValue = new EventEmitter<[number]>();

    private  currentValue: number;
    private slider: any;
    private handle: any;
    private sliderDiv: any;
    private  margin = {right: 50, left: 50};


    width = () =>{
        return this.sliderDiv.parentElement.offsetWidth - this.margin.left - this.margin.right;
    };

    createSlider = () => {

        console.log(this.currentValue);

        this.sliderDiv = document.getElementById('niwa_slider');
        d3.selectAll('svg > *').remove();

        let svg = d3.select('svg');


        let height = +svg.attr('height');


        let x = d3.scaleLinear()
            .domain([0, this.steps])
            .range([0, this.width()])
            .clamp(true);

        this.slider = svg.append('g')
            .attr('id', 'sliderGroup')
            .attr('class', 'niwa_slider')
            .attr('transform', 'translate(' + this.margin.left + ',' + height / 2 + ')');
        this.slider.append('line')
            .attr('class', 'track')
            .attr('x1', x.range()[0])
            .attr('x2', x.range()[1]);
        this.slider.append('rect')
            .attr('class', 'track')
            .attr('x', 0)
            .attr('y', -25)
            .attr('height', 50)
            .attr('width', x.range()[1])
            .attr('class', 'track-overlay')
            .call(d3.drag()
                .on('start.interrupt',  () => {
                    this.slider.interrupt();
                })
                .on('start drag', () => {
                    this.setSliderValue(x.invert(d3.event.x));
                })
                .on('end', () => {
                    this.positionHandle(x.invert(d3.event.x));
                }));

        this.slider.insert('g', '.track-overlay')
            .attr('class', 'ticks')
            .attr('transform', 'translate(0,' + 22 + ')')
            .selectAll('text')
            .data(x.ticks(this.ticks))
            .enter().append('text')
            .attr('x', x)
            .attr('text-anchor', 'middle')
            .text(function (d) {
                return d;
            });
        this.handle = this.slider.insert('circle', '.track-overlay')
            .attr('class', 'handle')
            .attr('r', 13);

        this.setSliderValue(this.currentValue);

    };

     x = d3.scaleLinear()
    .domain([0, this.steps])
    .range([0, this.width()])
    .clamp(true);

    positionHandle = (p) => {
        console.log(p);

        let closestMin = parseInt(p, 10);
        let closestMax = parseInt(p + 1, 10);
        let dist = closestMax - closestMin;

        let moveTo;
        if (p <= closestMin + (dist / 2)) {
            moveTo = closestMin;
        } else {
            moveTo = closestMax;
        }

        this.slider.transition()
            .duration(250)
            .tween('setSliderValue', function () {
                let i = d3.interpolate(p, moveTo);
                return function (t) {
                    this.setSliderValue(i(t));
                };
            });


    };



    setSliderValue = (sliderValue:number) => {

        this.handle.attr('cx', this.x(sliderValue));
        if (sliderValue !== this.currentValue) {
            this.currentValue = sliderValue;
            this.onSelectedValue.emit([this.currentValue]);
        }

    }

    ngOnInit() {

        this.createSlider();
        window.onresize = () => {
            this.createSlider();
        };
    }

}