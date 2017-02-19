import {
    Component, ViewEncapsulation, Input, Output, AfterViewInit, ApplicationRef, HostListener
} from '@angular/core';
import * as d3 from 'd3';
import {EventEmitter} from "@angular/common/src/facade/async";


@Component({
    selector: 'niwa-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    encapsulation: ViewEncapsulation.None


})

export class SliderComponent implements AfterViewInit {
    @Input() steps: number;
    @Input() ticks: number;

    @Output() onSelectedValue = new EventEmitter<[number]>();
    @HostListener('window:resize', ['$event'])
    onResize() {
        this.createSlider();
    }
    private currentValue: number;
    private slider: any;
    private handle: any;
    private sliderDiv: any = {};
    private margin = {right: 50, left: 50};

    constructor(
        private applicationRef: ApplicationRef

    ) {

    }


    private scale;

    createSlider = () => {

        let width = () => {
            let sliderDiv = document.getElementById('niwa_slider');
            return sliderDiv.offsetWidth - this.margin.left - this.margin.right;
        };


        this.scale  = d3.scaleLinear()
            .domain([0, this.steps])
            .range([0, width()])
            .clamp(true);


        this.sliderDiv = document.getElementById('niwa_slider');
        let sliderGroup = document.querySelector('#sliderGroup');
        // d3.selectAll('svg > *').remove();



        if (sliderGroup === null) {

            let svg = d3.select('svg');

            let height = +svg.attr('height');


            this.slider = svg.append('g')
                .attr('id', 'sliderGroup')
                .attr('class', 'niwa_slider')
                .attr('transform', 'translate(' + this.margin.left + ',' + height / 2 + ')');
            this.createDraggable(this.slider);


        } else {

            this.createDraggable(this.slider);
            this.applicationRef.tick();
            console.log(d3.select('#rectDrag'));

        }
    };

    createDraggable = (slider) => {
        d3.selectAll('#sliderGroup > *').remove();
        slider.append('line')
            .attr('class', 'track')
            .attr('id','sliderLine')
            .attr('x1', this.scale.range()[0])
            .attr('x2', this.scale.range()[1]);
        slider.append('rect')
            .attr('class', 'track')
            .attr('id','rectDrag')
            .attr('x', 0)
            .attr('y', -25)
            .attr('height', 50)
            .attr('width', this.scale.range()[1])
            .attr('class', 'track-overlay')
            .call(d3.drag()
                .on('start.interrupt', () => {
                    this.slider.interrupt();
                })
                .on('start drag', () => {
                    this.setSliderValue(this.scale.invert(d3.event.x,), this.scale);
                })
                .on('end', () => {
                    this.positionHandle(this.scale.invert(d3.event.x), this.scale);
                }));


        slider.insert('g', '.track-overlay')
            .attr('class', 'ticks')
            .attr('id','ticks')
            .attr('transform', 'translate(0,' + 22 + ')')
            .selectAll('text')
            .data(this.scale.ticks(this.ticks))
            .enter().append('text')
            .attr('x', this.scale)
            .attr('text-anchor', 'middle')
            .text(function (d) {
                return d;
            });
        this.handle = this.slider.insert('circle', '.track-overlay')
            .attr('class', 'handle')
            .attr('r', 13);

        this.setSliderValue(this.currentValue, this.scale);

    }
    positionHandle = (p, scale) => {
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
            .tween('setSliderValue', () => {
                let i = d3.interpolate(p, moveTo);
                return (t) => {
                    this.setSliderValue(i(t), scale);
                };
            });
    };


    setSliderValue = (sliderValue: number, lScale: any) => {




            console.log('sliderValue');
            console.log(sliderValue);
            this.currentValue = sliderValue;
            this.onSelectedValue.emit([this.currentValue]);
        console.log(this.currentValue);
        this.handle.attr('cx', lScale(sliderValue));

    };

    ngAfterViewInit() {

        this.createSlider();
        // window.onresize = () => {
        //     this.createDraggable(this.slider);
        // };
    }

}