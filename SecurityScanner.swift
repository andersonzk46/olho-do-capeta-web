//
// Criado por @andersonnzk46
//

import Foundation

class SecurityScanner {

    static func isJailbroken() -> Bool {

        let suspiciousPaths = [
            "/Applications/Cydia.app",
            "/Library/MobileSubstrate/",
            "/usr/lib/frida/",
            "/bin/bash"
        ]

        for path in suspiciousPaths {

            if FileManager.default.fileExists(atPath: path) {
                return true
            }
        }

        return false
    }

    static func scanFiles() -> [String] {

        let suspicious = [
            "/Applications/Cydia.app",
            "/usr/lib/frida/"
        ]

        var found: [String] = []

        for path in suspicious {

            if FileManager.default.fileExists(atPath: path) {
                found.append(path)
            }
        }

        return found
    }

    static func generateReport() -> String {

        let jailbreak = isJailbroken()
        let suspicious = scanFiles()

        var report = ""

        report += "=== OLHO DO CAPETA IOS ===\n"
        report += "Criado por @andersonnzk46\n"
        report += "Data: \(Date())\n\n"

        report += jailbreak
        ? "⚠️ Jailbreak Detectado\n"
        : "✅ Sistema Seguro\n"

        if suspicious.isEmpty {

            report += "✅ Nenhum arquivo suspeito encontrado\n"

        } else {

            report += "\nArquivos Suspeitos:\n"

            for file in suspicious {
                report += "- \(file)\n"
            }
        }

        return report
    }
}
