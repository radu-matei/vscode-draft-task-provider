'use strict'

import * as fs from 'fs';
import * as path from 'path';
import * as toml from 'toml';
import * as vscode from 'vscode';

let taskProvider: vscode.Disposable | undefined;
let workspaceRoot = vscode.workspace.rootPath;

export function activate(ctx: vscode.ExtensionContext): void {
    console.log("Draft task provider extension activated");

    console.log(workspaceRoot);
    if (!workspaceRoot) {
        return;
    }

    taskProvider = vscode.workspace.registerTaskProvider('draft', {
        provideTasks: () => {

            return getDraftTask();
        },
        resolveTask(_task: vscode.Task): vscode.Task | undefined {
            return undefined;
        }
    });
}

async function getDraftTask(): Promise<vscode.Task[]> {
    let t: vscode.Task[] = [];
    console.log("here")
    let tomlFile = path.join(workspaceRoot, 'draft.toml');
    if (!fs.existsSync(tomlFile)) {
        return t;
    }

    var cfg = toml.parse(tomlFile);
    console.log(cfg);
    return t;
}