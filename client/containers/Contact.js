import React, { Component } from 'react';
import Spacer from 'blocks/Spacer';
import Wrapper from 'blocks/Wrapper';
import Slider from 'components/slider';
import {
    Title,
    Description,
} from './styles';
export default class About extends Component {
    render() {
        return (
            <Wrapper>
                <Slider images={['https://images.unsplash.com/photo-1466096115517-bceecbfb6fde?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=427bcc1d8e2505d31a239d0de6b13f75&auto=format&fit=crop&w=1350&q=80']}/>
                <Spacer>&#10699;</Spacer>
                <Title>CONTACT US</Title>
                <Description>
                    <p>This is a streetwear brand founded by Wojciech Dybikowski in 2018.</p>
                    <p>If you have any questions or inquiries about our products, please send us an email at <a href="#">hello@world.com</a> We'd love to hear from you!</p>
                    <p>If you´re a blogger or journalist and would like to know more about our brand or products, please contact us at <a href="#">press@sitemail.com</a>.</p>
                </Description>
            </Wrapper>
        )
    }
}
