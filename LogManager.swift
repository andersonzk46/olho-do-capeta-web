//
// Criado por @andersonnzk46
//

import Foundation

class LogManager {

    static let shared = LogManager()

    private let fileName = "scan_logs.txt"

    func saveLog(_ text: String) {

        let url = getDocumentsDirectory().appendingPathComponent(fileName)

        let logText = "\n[\(Date())]\n\(text)\n"

        if FileManager.default.fileExists(atPath: url.path) {

            if let fileHandle = try? FileHandle(forWritingTo: url) {

                fileHandle.seekToEndOfFile()

                if let data = logText.data(using: .utf8) {
                    fileHandle.write(data)
                }

                fileHandle.closeFile()
            }

        } else {

            try? logText.write(to: url,
                               atomically: true,
                               encoding: .utf8)
        }
    }

    func exportReport(report: String) {

        let url = getDocumentsDirectory()
            .appendingPathComponent("relatorio_scan.txt")

        try? report.write(to: url,
                          atomically: true,
                          encoding: .utf8)
    }

    private func getDocumentsDirectory() -> URL {

        FileManager.default.urls(for: .documentDirectory,
                                 in: .userDomainMask)[0]
    }
}
