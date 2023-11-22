//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as fs from 'fs';
import * as path from 'path';
import vb2ts from '../src/vb2ts';

// Defines a1 Mocha test suite to group tests of similar k1ind together
suite("vb2ts Tests", () => {
    let testPairs: { inputs: string[], output: string }[] = [
        {
            inputs: ["Public Property Age As Integer\n"],
            output: "Age: number;\n"
        },
        {
            inputs: ["Public Property DepartmentID As Integer?\n"],
            output: "DepartmentID: number | null;\n"
        }
        // {
        //     inputs: ["MyClass<string, OtherClass<object, C2>> Generic { get; set; }"],
        //     output: "Generic: MyClass<string, OtherClass<any, C2>>;"
        // },
        // {
        //     inputs: ["MyClass<string[], OtherClass<object, C2>>[][] Generic { get; set; }"],
        //     output: "Generic: MyClass<string[], OtherClass<any, C2>>[][];"
        // },
        // {
        //     inputs: ["string[] names { get; set;}", "string  [] names { get; set;}", "string  [] names => rafa;"],
        //     output: "names: string[];"
        // },
        // {
        //     inputs: ["string[,][,,,] names { get; set;}"],
        //     output: "names: string[,][,,,];"
        // },
        // {
        //     inputs: ["List<string> List { get; set; }"],
        //     output: "List: string[];"
        // },
        // {
        //     inputs: ["int ? PropName { get; set; }"],
        //     output: "PropName: number | null;"
        // },
        // {
        //     inputs: ["int ? PropName { get; set; }"],
        //     output: "PropName: number | null;"
        // },
        // {
        //     inputs: ["Tuple<int, bool[]> PropName { get; set; }", "Tuple<int, List<bool>> PropName { get; set; }"],
        //     output: "PropName: { Item1: number, Item2: boolean[] };"
        // },
        // {
        //     inputs: ["Dictionary<string, Tuple<int, bool?, string>> PropName { get; set; }"],
        //     output: "PropName: { [key: string]: { Item1: number, Item2: boolean | null, Item3: string } };"
        // },
        // {
        //     inputs: ["Tuple<int, Dictionary<object, List<Tuple<int, bool?>>>> PropName { get; set; }", "Tuple<int, Dictionary<object, List<Tuple<int, bool?>>>> PropName => hello;"],
        //     output: "PropName: { Item1: number, Item2: { [key: string]: { Item1: number, Item2: boolean | null }[] } };"
        // },
    ];

    for (const p of testPairs) {
        for (const input of p.inputs) {
            test("Auto properties should get converted correctly", () => {
                assert.equal(vb2ts(input), p.output, input);
            });
        }
    }

    const vbDataDir = "test/data/vb/";
    const tsDataDir = "test/data/ts/";
    const testResultsDir = "test/results/"

    // Create test results directory if it does not exist
    if (!fs.existsSync(testResultsDir)) {
        fs.mkdirSync(testResultsDir);
    }

    // Delete all old results files
    let resultFileNames = fs.readdirSync(testResultsDir);
    for (let resultFileName of resultFileNames) {
        fs.unlinkSync(testResultsDir + resultFileName);
    }

    let vbFileNames = fs.readdirSync(vbDataDir);
    for (let vbFileName of vbFileNames) {
        let vbDeclaration = fs.readFileSync(vbDataDir + vbFileName).toString();
        let tsDeclaration;
        try {
            tsDeclaration = fs.readFileSync(tsDataDir + path.basename(vbFileName, ".vb") + ".ts").toString();
        } catch (ex) {
            let newEx = `The ${path.basename(vbFileName, ".vb")}.ts file that should correspond to ${vbFileName} file does not exist.`;
            throw newEx;
        }

        test(vbFileName, () => {
          const actual = vb2ts(vbDeclaration);
          const expected = tsDeclaration;

          if (actual != expected) {
            fs.writeFileSync(testResultsDir + vbFileName + '-actual', actual);
            fs.writeFileSync(testResultsDir + vbFileName + '-expected', expected);
          }

          assert.equal(actual, expected, vbFileName);
        });
    }
});
