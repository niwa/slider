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


    createSlider = () => {

        let sliderDiv = document.getElementById('niwa_slider');
        d3.selectAll('svg > *').remove();

        let currentValue;
        let svg = d3.select('svg');
        let margin = {right: 50, left: 50};

        let width = function () {
            return sliderDiv.parentElement.offsetWidth - margin.left - margin.right;
        };
        let height = +svg.attr('height');


        let x = d3.scaleLinear()
            .domain([0, this.steps])
            .range([0, width()])
            .clamp(true);

        let slider = svg.append('g')
            .attr('id', 'sliderGroup')
            .attr('class', 'niwa_slider')
            .attr('transform', 'translate(' + margin.left + ',' + height / 2 + ')');
        slider.append('line')
            .attr('class', 'track')
            .attr('x1', x.range()[0])
            .attr('x2', x.range()[1]);
        slider.append('rect')
            .attr('class', 'track')
            .attr('x', 0)
            .attr('y', -25)
            .attr('height', 50)
            .attr('width', x.range()[1])
            .attr('class', 'track-overlay')
            .call(d3.drag()
                .on('start.interrupt', function () {
                    slider.interrupt();
                })
                .on('start drag', function () {
                    setSliderValue(x.invert(d3.event.x));
                })
                .on('end', function () {
                    positionHandle(x.invert(d3.event.x));
                }));

        slider.insert('g', '.track-overlay')
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


        let handle = slider.insert('circle', '.track-overlay')
            .attr('class', 'handle')
            .attr('r', 13);


        let setSliderValue = (h) => {
            handle.attr('cx', x(h));
            if (parseInt(h, 10) !== currentValue) {
                currentValue = parseInt(h, 10);
                this.onSelectedValue.emit(currentValue);
            }
        };

        let positionHandle = (p) => {


            let closestMin = parseInt(p, 10);
            let closestMax = parseInt(p + 1, 10);
            let dist = closestMax - closestMin;

            let moveTo;
            if (p <= closestMin + (dist / 2)) {
                moveTo = closestMin;
            } else {
                moveTo = closestMax;
            }

            slider.transition()
                .duration(250)
                .tween('setSliderValue', function () {
                    let i = d3.interpolate(p, moveTo);
                    return function (t) {
                        setSliderValue(i(t));
                    };
                });


        };


    };


    ngOnInit() {

        this.createSlider();
        window.onresize = () => {
            this.createSlider();
        };
    }
}