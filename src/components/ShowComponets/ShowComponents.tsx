import { Component } from 'react';

/**
 * Componente responsável por mostrar ou não um determinado conteúdo.
 * @param {boolean} case - condição para o componente ser renderizado ou não
 * @param {Component} children - conteúdo a ser renderizado
 */

interface IRecipeProps {
    case?: boolean;
    children?: JSX.Element;
}

interface IRecipeState {
}

class ShowComponents extends Component<IRecipeProps, IRecipeState> {
    render() {       
        return this.props.case ? this.props.children : null;   
    }
}

export default ShowComponents;