/* tslint:disable:no-unused-variable */
import {  TestBed } from '@angular/core/testing';
import {  NO_ERRORS_SCHEMA } from '@angular/core';
import { SliderComponent } from "./slider.component";


describe('HomeComponent', () => {
    let component: SliderComponent;

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [
                SliderComponent
            ],
            providers: [

            ],
            schemas: [NO_ERRORS_SCHEMA]
        })


    })
    ;
    it('should display theslider', () => {
        let fixture = TestBed.createComponent(SliderComponent);
        component = fixture.componentInstance;

        component.steps = 6;
        component.ticks = 6;
        component.ngAfterViewInit();
        fixture.detectChanges();

        let compiled = fixture.debugElement.nativeElement;
        console.log (compiled.querySelector('svg'));
        let svg = compiled.querySelector('svg');

        expect(svg.id).toBe('niwa_slider');

    });
});
