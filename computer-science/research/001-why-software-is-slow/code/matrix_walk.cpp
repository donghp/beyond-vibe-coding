#include <chrono>
#include <cstddef>
#include <cstdint>
#include <iostream>
#include <vector>

using Clock = std::chrono::steady_clock;

std::uint64_t sum_row_wise(const std::vector<int>& matrix, std::size_t n) {
    std::uint64_t sum = 0;
    for (std::size_t i = 0; i < n; ++i) {
        for (std::size_t j = 0; j < n; ++j) {
            sum += static_cast<std::uint64_t>(matrix[i * n + j]);
        }
    }
    return sum;
}

std::uint64_t sum_column_wise(const std::vector<int>& matrix, std::size_t n) {
    std::uint64_t sum = 0;
    for (std::size_t j = 0; j < n; ++j) {
        for (std::size_t i = 0; i < n; ++i) {
            sum += static_cast<std::uint64_t>(matrix[i * n + j]);
        }
    }
    return sum;
}

template <typename Function>
double measure_ms(Function&& fn, int repetitions, std::uint64_t& checksum) {
    checksum = 0;
    const auto start = Clock::now();
    for (int r = 0; r < repetitions; ++r) checksum += fn();
    const auto stop = Clock::now();
    return std::chrono::duration<double, std::milli>(stop - start).count();
}

int main() {
    constexpr std::size_t n = 4096;
    constexpr int repetitions = 5;
    std::vector<int> matrix(n * n);

    for (std::size_t i = 0; i < matrix.size(); ++i) {
        matrix[i] = static_cast<int>((i * 17) % 101);
    }

    if (sum_row_wise(matrix, n) != sum_column_wise(matrix, n)) {
        std::cerr << "Result mismatch\n";
        return 1;
    }

    std::uint64_t row_checksum = 0;
    std::uint64_t column_checksum = 0;

    const auto row_ms = measure_ms(
        [&] { return sum_row_wise(matrix, n); },
        repetitions, row_checksum
    );
    const auto column_ms = measure_ms(
        [&] { return sum_column_wise(matrix, n); },
        repetitions, column_checksum
    );

    std::cout << "Row-wise: " << row_ms << " ms\n";
    std::cout << "Column-wise: " << column_ms << " ms\n";
    std::cout << "Checksums match: "
              << (row_checksum == column_checksum ? "yes" : "no") << '\n';
}
