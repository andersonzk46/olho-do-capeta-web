//
// Criado por @andersonnzk46
//

import SwiftUI

struct ContentView: View {

    @State private var report = "Nenhum scan executado"
    @State private var glow = false

    var body: some View {

        ZStack {

            LinearGradient(
                colors: [.black, .red.opacity(0.4)],
                startPoint: .top,
                endPoint: .bottom
            )
            .ignoresSafeArea()

            VStack(spacing: 25) {

                Text("OLHO DO CAPETA IOS")
                    .font(.largeTitle)
                    .bold()
                    .foregroundColor(.red)
                    .shadow(color: .red,
                            radius: glow ? 20 : 5)

                    .scaleEffect(glow ? 1.05 : 1.0)
                    .animation(
                        .easeInOut(duration: 1.2)
                        .repeatForever(),
                        value: glow
                    )

                Text("Criado por @andersonnzk46")
                    .foregroundColor(.gray)

                ScrollView {

                    Text(report)
                        .foregroundColor(.red)
                        .padding()
                        .frame(maxWidth: .infinity,
                               alignment: .leading)
                }
                .frame(height: 300)
                .background(Color.black.opacity(0.8))
                .cornerRadius(15)
                .overlay(
                    RoundedRectangle(cornerRadius: 15)
                        .stroke(Color.red, lineWidth: 2)
                )

                Button(action: {

                    let generated = SecurityScanner.generateReport()

                    report = generated

                    LogManager.shared.saveLog(generated)

                }) {

                    Text("INICIAR SCAN")
                        .bold()
                        .foregroundColor(.black)
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(Color.red)
                        .cornerRadius(12)
                }

                Button(action: {

                    LogManager.shared.exportReport(report: report)

                }) {

                    Text("EXPORTAR RELATÓRIO")
                        .bold()
                        .foregroundColor(.red)
                        .padding()
                        .frame(maxWidth: .infinity)
                        .overlay(
                            RoundedRectangle(cornerRadius: 12)
                                .stroke(Color.red, lineWidth: 2)
                        )
                }
            }
            .padding()
        }
        .onAppear {

            glow = true
        }
    }
}

#Preview {
    ContentView()
}
