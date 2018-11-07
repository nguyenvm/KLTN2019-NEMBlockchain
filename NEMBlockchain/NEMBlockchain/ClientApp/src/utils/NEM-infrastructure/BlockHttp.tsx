import { BlockHttp, Block } from "nem-library";

export function getBlockByHeight(height: number) {
    const blockHttp = new BlockHttp();
    blockHttp.getBlockByHeight(height).subscribe(block => {
        console.log(block);
    });
}

export * from './BlockHttp';